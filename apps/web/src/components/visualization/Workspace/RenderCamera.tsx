import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
  useHelper
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { CameraHelper, Layers, Vector3 } from "three";

import { BlenderConfiguration } from "shared-types";

export interface RenderCameraProps extends BlenderConfiguration {
  lockCameraToSphere: boolean;
}

const RenderCamera: React.FC<RenderCameraProps> = (config) => {
  const controlRef = useRef<any>(null!);

  const getSphereXyz = (radius: number, azi: number, inc: number) => {
    return [
      radius * Math.sin(inc) * Math.cos(azi),
      radius * Math.sin(inc) * Math.sin(azi),
      radius * Math.cos(inc)
    ];
  };

  useFrame(() => {
    if (!config.lockCameraToSphere) {
      return;
    }

    // Limit camera transform to camera sphere
    const posVec = controlRef.current.object.position as Vector3;
    const radius = posVec.length();
    const azimuth =
      (Math.atan2(posVec.y, posVec.x) + 2 * Math.PI) % (2 * Math.PI);
    const elevation = -(
      Math.atan2(
        posVec.z,
        Math.sqrt(posVec.x * posVec.x + posVec.y * posVec.y)
      ) -
      Math.PI / 2
    );

    if (radius != 1) {
      posVec.multiplyScalar(1 / (radius ?? 1));
    }

    const newAzi =
      azimuth < config.random.min_azi
        ? config.random.min_azi
        : azimuth > config.random.max_azi
        ? config.random.max_azi
        : azimuth;
    const newInc =
      elevation < config.random.min_inc
        ? config.random.min_inc
        : elevation > config.random.max_inc
        ? config.random.max_inc
        : elevation;
    const newPos = getSphereXyz(posVec.length(), newAzi, newInc);
    posVec.set(newPos[0], newPos[1], newPos[2]);
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[1, 0, 0]}
        up={[0, 0, 1]}
        fov={config.render.camera.lens}
        near={config.render.camera.clip_start}
        far={config.render.camera.clip_end}
      />
      <OrbitControls
        enableZoom={!config.lockCameraToSphere}
        enablePan={false}
        ref={controlRef}
        target={[0, 0, 0]}
      />
    </>
  );
};

export default RenderCamera;
