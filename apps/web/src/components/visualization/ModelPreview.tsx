import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { UrlFile } from "../inputs/FileInput";
import AutoFitModelObject from "./ModelObject/AutoFitModelObject";

export interface ModelPreviewProps {
  model?: UrlFile | string;
  modelAssets?: UrlFile[] | string[];

  onThumbnailUpdate?: (dataUrl: string) => void;
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ model: modelPath, modelAssets = [], onThumbnailUpdate }) => {
  const orbitControlsRef = useRef<any>(null!);
  const allLayers = new THREE.Layers();
  allLayers.enableAll();

  return (
    <Canvas className="h-screen" camera={{ layers: allLayers }}>
      <ambientLight intensity={.1} />
      <pointLight position={[0, 0, 3]} />
      <directionalLight />
      {modelPath &&
        <AutoFitModelObject onThumbnailUpdate={onThumbnailUpdate} orbitControls={orbitControlsRef} model={modelPath} modelAssets={modelAssets} />
      }

      <OrbitControls ref={orbitControlsRef} />
    </Canvas>
  );
};

export default ModelPreview;
