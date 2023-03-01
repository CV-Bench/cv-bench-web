import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Layers } from "three";

import { DataUrlFile } from "shared-types";

import AutoFitModelObject from "./ModelObject/AutoFitModelObject";

export interface ModelPreviewProps {
  className?: string;

  model?: DataUrlFile | string;
  modelAssets?: DataUrlFile[] | string[];

  onThumbnailUpdate?: (dataUrl: string) => void;
}

const ModelPreview: React.FC<ModelPreviewProps> = ({ model: modelPath, modelAssets = [], className, onThumbnailUpdate }) => {
  const allLayers = new Layers();
  allLayers.enableAll();

  return (
    <Canvas className={(className ? ` ${className}` : '')} camera={{ layers: allLayers }}>
      <ambientLight intensity={.1} />
      <pointLight position={[0, 0, 3]} />
      <directionalLight />
      {modelPath && (
        <AutoFitModelObject
          onThumbnailUpdate={onThumbnailUpdate}
          model={modelPath}
          modelAssets={modelAssets}
        />
      )}

      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default ModelPreview;
