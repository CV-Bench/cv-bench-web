import { TransformControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { CameraHelper, Layers, PerspectiveCamera, Vector3 } from "three";
import { BlenderConfiguration, PostDatasetConfiguration } from "types";
import RenderCameraControls from "./RenderCameraControls";
import RenderPreview from "./RenderPreview";

export interface RenderCameraProps extends BlenderConfiguration {
  showCameraFrustum: boolean;
}

const RenderCamera: React.FC<RenderCameraProps> = (config) => {
  const cameraRef = useRef<PerspectiveCamera>(null!);
  const camHelper = useHelper(cameraRef, CameraHelper);
  
  useEffect(() => {
    if (camHelper.current) {
      camHelper.current.visible = config.showCameraFrustum
    }
  })

  const controlRef = useRef<any>(null!);

  const getSphereXyz = (radius: number, azi: number, inc: number) => {
    return [
      radius * Math.sin(inc) * Math.cos(azi),
      radius * Math.sin(inc) * Math.sin(azi),
      radius * Math.cos(inc)
    ];
  };

  useFrame(() => {
    // Limit camera transform to camera spheres
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

    if (radius == 0) {
      return;
    }

    if (radius != 1) {
      posVec.multiplyScalar(1 / radius);
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

    // Look at 0,0,0
    cameraRef.current.lookAt(new Vector3(0, 0, 0));
  });

  return (
    <>
      <TransformControls position={[0, 0, 1]} ref={controlRef} layers={1}>
        <perspectiveCamera
          aspect={config.render.camera.sensor_width / config.render.camera.sensor_height}
          up={[0, 0, 1]}
          ref={cameraRef}
          fov={config.render.camera.lens}
          near={config.render.camera.clip_start}
          far={config.render.camera.clip_end}
        />
      </TransformControls>

      <RenderCameraControls renderCameraRef={cameraRef} />
      <RenderPreview renderCameraRef={cameraRef} config={config} />
    </>
  );
};

export default RenderCamera;
