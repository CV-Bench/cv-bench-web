import { UrlFile } from "@/components/inputs/FileInput";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";
import ModelObject from "./ModelObject";

export interface AutoFitModelObjectProps {
  model: UrlFile | string;
  modelAssets?: UrlFile[] | string[];
  orbitControls?: React.MutableRefObject<OrbitControls>;
  onThumbnailUpdate?: (dataUrl: string) => void;
}

const AutoFitModelObject: React.FC<AutoFitModelObjectProps> = ({ model, modelAssets, orbitControls, onThumbnailUpdate }) => {
  const { gl, scene, camera } = useThree();

  const onObjectUpdate = (obj: THREE.Object3D) => {
    if (orbitControls?.current) {
      orbitControls.current.reset();
      const fitOffset = 1.2;
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      var box = new THREE.Box3().setFromObject(obj);
      box.getSize(size);
      box.getCenter(center);

      const maxSize = Math.max(size.x, size.y, size.z);
      const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * (camera as any).fov / 360));
      const fitWidthDistance = fitHeightDistance / (camera as any).aspect;
      const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

      const direction = orbitControls.current.target.clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);

      orbitControls.current.maxDistance = distance * 10;
      orbitControls.current.target.copy(center);

      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(orbitControls.current.target).sub(direction);

      orbitControls.current.update();
    }
    if (onThumbnailUpdate) {
      gl.render(scene, camera);
      onThumbnailUpdate(gl.domElement.toDataURL());
    }
  }

  return <ModelObject model={model} modelAssets={modelAssets} onUpdate={onObjectUpdate} />
};

export default AutoFitModelObject;
