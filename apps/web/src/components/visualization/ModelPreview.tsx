import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SelectedFile } from "../inputs/FileInput";
import ModelObject from "./ModelObject/ModelObject";

export interface ModelPreviewProps {
  model?: SelectedFile | string;
  materials?: SelectedFile[] | string[];
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ model: modelPath, materials: materialPaths = [] }) => {
  const orbitControlsRef = useRef<any>(null!);
  const allLayers = new THREE.Layers();
  allLayers.enableAll();

  return (
    <Canvas className="h-screen" camera={{ layers: allLayers }}>
      <ambientLight intensity={.1} />
      <pointLight position={[0, 0, 3]} />
      <directionalLight />

      {modelPath &&
        <ModelObject model={modelPath} materials={materialPaths} />
      }

      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default ModelPreview;
