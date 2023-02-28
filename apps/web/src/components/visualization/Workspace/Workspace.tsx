import { OrbitControls, TransformControls } from "@react-three/drei";
import {
  Canvas,
  PerspectiveCameraProps,
  useLoader,
  useThree
} from "@react-three/fiber";
import React, { useRef, useState } from "react";
import ModelObject from "../ModelObject/ModelObject";
import { Layers } from "three";
import { BlenderConfiguration, GetModelList, PostDatasetConfiguration, PostDatasetConfigurationBody } from "types";
import { useModel } from "@/hooks/model";
import CameraSphere from "./CameraSphere";
import RenderCamera from "./RenderCamera";
import PositionedObject from "./PositionedObject";

export interface WorkspaceProps {
  className?: string;

  configuration: BlenderConfiguration;
  selectedModels: GetModelList;

  showModelBox: boolean;
  showCameraSphere: boolean;
  showCameraFrustum: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ className, selectedModels, configuration, showModelBox, showCameraSphere, showCameraFrustum }) => {

  const { data: model } = useModel(selectedModels[0]?._id ?? '');

  return (
    <Canvas className={(className ? ` ${className}` : '')} camera={{ up: [0, 0, 1], position: [0, 0, 3] }}>
      <ambientLight intensity={.1} />
      <pointLight position={[0, 0, 3]} />
      <directionalLight />

      <PositionedObject childScale={configuration.render.model_scale} showBox={showModelBox} {...configuration}>
        {model && <ModelObject model={model.modelObject} modelAssets={model.modelAssets} />}
      </PositionedObject>
      <RenderCamera showCameraFrustum={showCameraFrustum} {...configuration} />
      {showCameraSphere && <CameraSphere {...configuration.random} />}

      <OrbitControls target={[0, 0, 0]} makeDefault />
    </Canvas>
  );
};

export default Workspace;
