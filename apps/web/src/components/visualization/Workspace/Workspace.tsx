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
import { BlenderConfiguration, GetBackgroundList, GetModelList, PostDataset, PostDatasetConfiguration, PostDatasetConfigurationBody } from "shared-types";
import { useModel } from "@/hooks/model";
import CameraSphere from "./CameraSphere";
import RenderCamera from "./RenderCamera";
import PositionedObject from "./PositionedObject";
import SceneBackground from "./SceneBackground";
import { useBackground } from "@/hooks/background";
import styled from "@emotion/styled";

export interface WorkspaceProps {
  dataset: PostDataset;

  visuals: WorkspaceVisuals;
}

export interface WorkspaceVisuals {
  showModelBox: boolean;
  showCameraSphere: boolean;
  showRenderResolution: boolean;
  lockCameraToSphere: boolean;
  selectedModelId: string;
  selectedBackgroundId: string;
}

const Workspace: React.FC<WorkspaceProps> = ({ dataset, visuals }) => {

  const { data: model } = useModel(visuals.selectedModelId);
  const { data: background } = useBackground(visuals.selectedBackgroundId);
  const configuration = dataset.configuration;

  const dpr = visuals.showRenderResolution ? (1 as any) : [1, 2];
  const width = visuals.showRenderResolution ? configuration.render.resolution_x : '100%';
  const height = visuals.showRenderResolution ? configuration.render.resolution_y : '100%';

  return (
    <div style={{width, height}}>
      <Canvas dpr={dpr}  camera={{ position: [-2, 2, 5] }}>
        <pointLight position={[0, 0, 1]} power={configuration.render.exposure} />
        {background && <SceneBackground background={background.previewImage} />}
        <PositionedObject childScale={configuration.render.model_scale} showBox={visuals.showModelBox} {...configuration}>
          {model && <ModelObject model={model.modelObject} modelAssets={model.modelAssets} />}
        </PositionedObject>
        <RenderCamera lockCameraToSphere={visuals.lockCameraToSphere} {...configuration} />
        {visuals.showCameraSphere && <CameraSphere {...configuration.random} />}
      </Canvas>
    </div>
  );
};

export default Workspace;
