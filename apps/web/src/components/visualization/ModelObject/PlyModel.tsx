import { useFrame, useLoader } from "@react-three/fiber";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import React, { PropsWithChildren, Ref, useRef } from "react";
import { ModelObjectProps } from "./ModelObject";
import { Color, MeshPhongMaterial } from "three";
import { TransformControls } from "@react-three/drei";

export interface PlyModelProps {
  model: string;
}

const PlyModel: React.FC<PlyModelProps> = ({ model }) => {
  const plyGeom = useLoader(PLYLoader, model, undefined);
  plyGeom.computeVertexNormals();
  return (
    <mesh layers={1} geometry={plyGeom} receiveShadow castShadow
      scale={0.0005}>
      <meshPhongMaterial />
    </mesh>
  )
};

export default PlyModel;
