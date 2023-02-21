import { useFrame, useLoader } from "@react-three/fiber";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import React, { useRef } from "react";
import { ModelObjectProps } from "./ModelObject";
import { Color, MeshPhongMaterial } from "three";

const PlyModel: React.FC<ModelObjectProps> = ({ modelPath }) => {
  const plyGeom = useLoader(PLYLoader, modelPath);
  plyGeom.computeVertexNormals();
  return (
    <mesh layers={1} geometry={plyGeom} receiveShadow castShadow
      scale={0.0005}>
      <meshPhongMaterial  />
    </mesh>
  )
};

export default PlyModel;
