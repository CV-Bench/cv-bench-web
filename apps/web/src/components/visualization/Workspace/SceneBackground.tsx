import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

export interface SceneBackgroundProps {
  background: string;
}

const SceneBackground: React.FC<SceneBackgroundProps> = ({ background }) => {
  const texture = useLoader(TextureLoader, background);
  const { scene, gl } = useThree();

  scene.background = texture;

  const targetAspect = gl.domElement.width / gl.domElement.height;
  const imageAspect = texture.image.width / texture.image.height;
  const factor = imageAspect / targetAspect;

  scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
  scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
  scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
  scene.background.repeat.y = factor > 1 ? 1 : factor;

  return <></>;
};

export default SceneBackground;
