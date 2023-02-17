import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import ModelObject from "./ModelObject/ModelObject";

export interface ModelPreviewProps {

}

const ModelPreview: React.FC<ModelPreviewProps> = () => {


  return (
    <Canvas className="h-screen">
      <pointLight position={[10, 10, 10]} />
      <ModelObject modelPath="/teapot.obj" />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelPreview;
