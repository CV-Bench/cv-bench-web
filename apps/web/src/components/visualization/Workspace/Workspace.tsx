import { OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import {
  Canvas,
  PerspectiveCameraProps,
  useLoader,
  useThree
} from "@react-three/fiber";
import React, { useRef, useState } from "react";
import ModelObject from "../ModelObject/ModelObject";
import { Layers, Vector3 } from "three";
import { BlenderConfiguration, GetModelList, PostDatasetConfiguration, PostDatasetConfigurationBody } from "shared-types";
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
  lockCameraToSphere: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ className, selectedModels, configuration, showModelBox, showCameraSphere, lockCameraToSphere }) => {

  const { data: model } = useModel(selectedModels[0]?._id ?? '');

  return (
    <Canvas className={(className ? ` ${className}` : '')} camera={{ position: [-2, 2, 5] }}>
      <ambientLight intensity={.1} />
      <pointLight position={[0, 0, 3]} />
      <directionalLight />

      <PositionedObject childScale={configuration.render.model_scale} showBox={showModelBox} {...configuration}>
        {model && <ModelObject model={model.modelObject} modelAssets={model.modelAssets} />}
      </PositionedObject>

      <RenderCamera lockCameraToSphere={lockCameraToSphere} {...configuration} />
      {showCameraSphere && <CameraSphere {...configuration.random} />}
    </Canvas>
  );
};

export default Workspace;
