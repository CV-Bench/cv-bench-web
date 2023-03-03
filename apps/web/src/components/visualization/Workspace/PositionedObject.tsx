import { Box, TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { PropsWithChildren, useRef } from "react";
import { DoubleSide, Vector3 } from "three";

import { BlenderConfiguration } from "shared-types";

export interface PositionedObjectProps
  extends PropsWithChildren,
    BlenderConfiguration {
  showBox: boolean;

  childScale: number;
}

const PositionedObject: React.FC<PositionedObjectProps> = (props) => {
  const min = new Vector3(
    props.random.min_x_pos,
    props.random.min_y_pos,
    props.random.min_z_pos
  );
  const max = new Vector3(
    props.random.max_x_pos,
    props.random.max_y_pos,
    props.random.max_z_pos
  );

  const width = max.x - min.x;
  const height = max.y - min.y;
  const depth = max.z - min.z;

  const centerX = min.x + width / 2;
  const centerY = min.y + height / 2;
  const centerZ = min.z + depth / 2;

  return (
    <>
      {props.showBox && (
        <Box
          position={[centerX, centerY, centerZ]}
          args={[width, height, depth]}
        >
          <meshStandardMaterial wireframe side={DoubleSide} color="red" />
        </Box>
      )}

      <group scale={props.childScale} position={[centerX, centerY, centerZ]}>
        {props.children}
      </group>
    </>
  );
};

export default PositionedObject;
