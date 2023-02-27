import { OrthographicCamera, Plane, useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Camera, Color, PerspectiveCamera, Scene } from "three";

export interface RenderPreviewProps {
  renderCameraRef: React.MutableRefObject<PerspectiveCamera>;
}

const RenderPreview: React.FC<RenderPreviewProps> = ({ renderCameraRef }) => {
  const { gl } = useThree()
  const canvasHeight = gl.domElement.clientHeight;
  const canvasWidth = gl.domElement.clientWidth;
  const previewSize = canvasWidth / 4;

  const previewX = previewSize / 2 - canvasWidth / 2;
  const previewY = previewSize / 2 - canvasHeight / 2;



  const guiScene = new Scene()
  const guiCamera = React.useRef<Camera>(null!)

  const fbo = useFBO(previewSize, previewSize)

  useFrame(({ gl, scene, camera }) => {
    renderCameraRef.current.updateProjectionMatrix();
    gl.autoClear = false;

    gl.setRenderTarget(fbo);
    scene.background = new Color('#333');
    gl.render(scene, renderCameraRef.current);
    scene.background = null;
    gl.setRenderTarget(null);

    gl.render(scene, camera);

    gl.render(guiScene, guiCamera.current)

    gl.autoClear = true;
  }, 2);

  return createPortal(
    <>
      <OrthographicCamera ref={guiCamera} near={0.0001} far={1} />
      <group position={[previewX, previewY, -.1]}>
        <Plane args={[previewSize, previewSize, 1]}>
          <meshBasicMaterial map={fbo.texture} />
        </Plane>
      </group>
    </>, guiScene
  )
};

export default RenderPreview;