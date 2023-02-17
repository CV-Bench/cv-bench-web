import { Sphere, useHelper } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { DoubleSide, Side } from "three";
import { SceneProperties } from "./Workspace";

const CameraSphere: React.FC<SceneProperties> = ({ camAzi, camInc, camRadius }) => {

  const thetaStart = camInc.min;
  const thetaLength = camInc.max - camInc.min;
  const phiStart = camAzi.min;
  const phiLength = camAzi.max - camAzi.min;

  return <>
    <mesh rotation={[Math.PI / 2, Math.PI, 0]} receiveShadow={false} castShadow={false}>
      <sphereGeometry args={[camRadius.min, 32, 32, phiStart, phiLength, thetaStart, thetaLength]} />
      <meshStandardMaterial wireframe side={DoubleSide} color="orange" />
    </mesh>
    <mesh rotation={[Math.PI / 2, Math.PI, 0]} receiveShadow={false} castShadow={false}>
      <sphereGeometry args={[camRadius.max, 32, 32, phiStart, phiLength, thetaStart, thetaLength]} />
      <meshStandardMaterial wireframe side={DoubleSide} color="orange" />
    </mesh>
  </>
};

export default CameraSphere;
