import { useLoader } from "@react-three/fiber";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import React from "react";
import { UrlFile } from "@/components/inputs/FileInput";

export interface PlyModelProps {
  model: UrlFile;
  
  onUpdate?: (obj: THREE.Object3D) => void;
}

const PlyModel: React.FC<PlyModelProps> = ({ model, onUpdate }) => {
  const plyGeom = useLoader(PLYLoader, model.url, undefined);
  plyGeom.computeVertexNormals();

  return (
    <mesh onUpdate={onUpdate} layers={1} geometry={plyGeom} receiveShadow castShadow
      scale={0.0005}>
      <meshPhongMaterial />
    </mesh>
  )
};

export default PlyModel;
