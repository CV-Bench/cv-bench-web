import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PerspectiveCamera } from "three";

export interface RenderCameraControlsProps {
  renderCameraRef: React.MutableRefObject<PerspectiveCamera>;
}

const RenderCameraControls: React.FC<RenderCameraControlsProps> = ({
  renderCameraRef
}) => {
  const gl = useThree((state) => state.gl);

  return useFrame((state, delta) => {
    const camera = renderCameraRef.current;

    camera.updateProjectionMatrix();
  }, 1);
};
export default RenderCameraControls;
