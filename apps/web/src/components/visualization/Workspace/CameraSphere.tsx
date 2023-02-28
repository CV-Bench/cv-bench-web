import { DoubleSide } from "three";

export type CameraSphereProps = {
  min_azi: number;
  max_azi: number;

  min_inc: number;
  max_inc: number;
}

const CameraSphere: React.FC<CameraSphereProps> = ({ min_azi, max_azi, min_inc, max_inc }) => {
  const thetaStart = min_inc;
  const thetaLength = max_inc - min_inc;
  const phiStart = min_azi;
  const phiLength = max_azi - min_azi;

  return (
    <>
      <mesh
        rotation={[Math.PI / 2, Math.PI, 0]}
        receiveShadow={false}
        castShadow={false}
      >
        <sphereGeometry
          args={[
            1,
            32,
            32,
            phiStart,
            phiLength,
            thetaStart,
            thetaLength
          ]}
        />
        <meshStandardMaterial wireframe side={DoubleSide} color="orange" />
      </mesh>
      {/* <mesh
        rotation={[Math.PI / 2, Math.PI, 0]}
        receiveShadow={false}
        castShadow={false}
      >
        <sphereGeometry
          args={[
            radius_max,
            32,
            32,
            phiStart,
            phiLength,
            thetaStart,
            thetaLength
          ]}
        />
        <meshStandardMaterial wireframe side={DoubleSide} color="orange" />
      </mesh> */}
    </>
  );
};

export default CameraSphere;
