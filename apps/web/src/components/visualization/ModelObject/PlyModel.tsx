import { useLoader } from "@react-three/fiber";
import React from "react";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

import { DataUrlFile } from "shared-types";

export interface PlyModelProps {
  model: DataUrlFile;

  onUpdate?: (obj: THREE.Object3D) => void;
}

const PlyModel: React.FC<PlyModelProps> = ({ model, onUpdate }) => {
  const plyGeom = useLoader(PLYLoader, model.dataUrl, undefined);
  plyGeom.computeVertexNormals();

  return (
    <mesh
      onUpdate={onUpdate}
      geometry={plyGeom}
      receiveShadow
      castShadow
      scale={0.0005}
    >
      <meshPhongMaterial />
    </mesh>
  );
};

export default PlyModel;
