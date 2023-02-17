import { Box, Sphere, TransformControls, useHelper } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { AxesHelper, DoubleSide, Side } from "three";
import { SceneProperties } from "./Workspace";

export interface PositionedObjectProps extends PropsWithChildren, SceneProperties {
    
}

const PositionedObject: React.FC<PositionedObjectProps> = ({ objX, objY, objZ, children = undefined }) => {
    const width = objX.max - objX.min;
    const height = objY.max - objY.min;
    const depth = objZ.max - objZ.min;

    const centerX = objX.min + width / 2
    const centerY = objY.min + height / 2
    const centerZ = objZ.min + depth / 2
    return <>
        <TransformControls  position={[centerX, centerY, centerZ]} mode="translate">
            <Box args={[width, height, depth]}>
                <meshStandardMaterial wireframe side={DoubleSide} color="red" />
            </Box>
        </TransformControls>

        <group position={[centerX, centerY, centerZ]}>
            <axesHelper args={[.5]} />
            {children}

        </group>

    </>
};

export default PositionedObject;
