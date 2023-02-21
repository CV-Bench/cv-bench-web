import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas, PerspectiveCameraProps, useLoader, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import ModelObject from "../ModelObject/ModelObject";
import CameraSphere from "./CameraSphere";
import RenderCamera from "./RenderCamera";
import * as THREE from "three";
import PositionedObject from "./PositionedObject";
import ScenePropertiesEditor from "./ScenePropertiesEditor/ScenePropertiesEditor";


export interface SceneProperties {
  objX: MinMaxProperty;
  objY: MinMaxProperty;
  objZ: MinMaxProperty;

  camRadius: MinMaxProperty;
  camAzi: MinMaxProperty;
  camInc: MinMaxProperty;

  camFov: ValueProperty;
  camClip: MinMaxProperty;
}

export interface WorkspaceProps {

}

export interface RangeProperty {
  minHint?: number;
  maxHint?: number;
}

export interface ValueProperty extends RangeProperty {
  value: number;
}

export interface MinMaxProperty extends RangeProperty {
  min: number;
  max: number;
}

const Workspace: React.FC<WorkspaceProps> = () => {

  const [properties, setProperties] = useState<SceneProperties>({
    objX: {
      min: -.2,
      max: .2
    },
    objY: {
      min: -.2,
      max: .2
    },
    objZ: {
      min: -.2,
      max: .2
    },

    camRadius: {
      min: .3,
      max: 1.1
    },
    camAzi: {
      min: 0,
      max: 2 * Math.PI,
      minHint: 0,
      maxHint: 2 * Math.PI
    },
    camInc: {
      min: 0,
      max: Math.PI / 2,
      minHint: 0,
      maxHint: Math.PI
    },

    camFov: {
      minHint: 0,
      maxHint: 180,
      value: 50,
    },
    camClip: {
      minHint: 0.01,
      min: .01,
      max: 50,
    }
  });

  const [visuals, setVisuals] = useState({
    showCameraSpheres: true,
    showCameraFrustum: true,
    showObjectBox: false,
    showObjectOrigin: false
  })

  const allLayers = new THREE.Layers();
  allLayers.enableAll();
  return (
    <div className="relative h-full flex">
      <ScenePropertiesEditor properties={properties} setProperties={setProperties} />
      <Canvas className="flex-1" camera={{ layers: allLayers, up: [0, 0, 1], position: [0, 0, 3] }}>
        <ambientLight intensity={.1} layers={allLayers} />
        <pointLight position={[0, 0, 3]} />
        <directionalLight layers={allLayers} />
        <PositionedObject {...properties}>
          <ModelObject model="/big_dolph.ply" />
        </PositionedObject>
        <CameraSphere {...properties} />
        <RenderCamera {...properties} />


        <OrbitControls target={[0, 0, 0]} makeDefault />
      </Canvas>
    </div>

  );
};

export default Workspace;
