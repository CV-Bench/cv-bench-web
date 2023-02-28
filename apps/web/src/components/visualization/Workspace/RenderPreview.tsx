import { OrthographicCamera, Plane, useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Camera, Color, PerspectiveCamera, Scene } from "three";
import { BlenderConfiguration } from "types";

export interface RenderPreviewProps {
  renderCameraRef: React.MutableRefObject<PerspectiveCamera>;
  config: BlenderConfiguration
}

const RenderPreview: React.FC<RenderPreviewProps> = ({ renderCameraRef, config }) => {
  const { gl } = useThree()
  const canvasHeight = gl.domElement.clientHeight;
  const canvasWidth = gl.domElement.clientWidth;
  const previewWidth = config.render.resolution_x;
  const previewHeight = config.render.resolution_y;

  const previewX = previewWidth / 2 - canvasWidth / 2;
  const previewY = previewHeight / 2 - canvasHeight / 2;

  const guiScene = new Scene();
  const guiCamera = React.useRef<Camera>(null!);


  const fbo = useFBO(previewWidth, previewHeight)

  useFrame(({ gl, scene, camera }) => {
    renderCameraRef.current.updateProjectionMatrix();
    gl.autoClear = false;

    gl.setRenderTarget(fbo);
    scene.background = new Color("#333");
    gl.render(scene, renderCameraRef.current);
    scene.background = null;
    gl.setRenderTarget(null);

    gl.render(scene, camera);

    gl.render(guiScene, guiCamera.current);

    gl.autoClear = true;
  }, 2);

  return createPortal(
    <>
      <OrthographicCamera ref={guiCamera} near={0.0001} far={1} />
<<<<<<< HEAD
      <group position={[previewX, previewY, -.1]}>
        <Plane args={[previewWidth, previewHeight, 1]}>
=======
      <group position={[previewX, previewY, -0.1]}>
        <Plane args={[previewSize, previewSize, 1]}>
>>>>>>> main
          <meshBasicMaterial map={fbo.texture} />
        </Plane>
      </group>
    </>,
    guiScene
  );
};

export default RenderPreview;
