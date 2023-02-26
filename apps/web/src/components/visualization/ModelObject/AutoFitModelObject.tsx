import React, { useEffect, useState } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useThree } from "@react-three/fiber";
import ModelObject from "./ModelObject";
import { DataUrlFile } from "types";
import { Vector3, Box3 } from "three";

export interface AutoFitModelObjectProps {
  model: DataUrlFile | string;
  modelAssets?: DataUrlFile[] | string[];

  onThumbnailUpdate?: (dataUrl: string) => void;
}

const AutoFitModelObject: React.FC<AutoFitModelObjectProps> = ({ model, modelAssets, onThumbnailUpdate }) => {
  const [controlsLoaded, setControlsLoaded] = useState(false);

  const { gl, scene, camera, controls } = useThree();
  const orbitControls = controls as OrbitControls;

  const onObjectUpdate = (obj: THREE.Object3D) => {
    if (orbitControls) {
      orbitControls.reset();
      const fitOffset = 1.2;
      const size = new Vector3();
      const center = new Vector3();
      var box = new Box3().setFromObject(obj);
      box.getSize(size);
      box.getCenter(center);

      const maxSize = Math.max(size.x, size.y, size.z);
      const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * (camera as any).fov / 360));
      const fitWidthDistance = fitHeightDistance / (camera as any).aspect;
      const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

      const direction = orbitControls.target.clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);

      orbitControls.maxDistance = distance * 10;
      orbitControls.target.copy(center);

      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(orbitControls.target).sub(direction);

      orbitControls.update();
    }

    if (onThumbnailUpdate) {
      gl.render(scene, camera);
      onThumbnailUpdate(gl.domElement.toDataURL());
    }
  }

  useEffect(() => {
    if (orbitControls) {
      setControlsLoaded(true);
    }
  }, [orbitControls]);

  return <>
    {controlsLoaded && <ModelObject model={model} modelAssets={modelAssets} onUpdate={onObjectUpdate} />}
  </>
};

export default AutoFitModelObject;
