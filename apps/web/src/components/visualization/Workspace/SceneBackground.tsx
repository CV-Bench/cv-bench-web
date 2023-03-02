import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

export interface SceneBackgroundProps {

}

const SceneBackground: React.FC<SceneBackgroundProps> = ({  }) => {

  const texture = useLoader(TextureLoader, '');
  const { scene } = useThree();
  scene.background = texture;

 return (<></>)
};

export default SceneBackground;
