import { OrthographicCamera, Plane, TransformControls, useFBO, useHelper } from "@react-three/drei";
import { createPortal, PerspectiveCameraProps, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import  { CameraHelper, PerspectiveCamera, Sphere, Vector3  } from "three";
import RenderCameraControls from "./RenderCameraControls";
import RenderPreview from "./RenderPreview";
import { SceneProperties } from "./Workspace";

const RenderCamera: React.FC<SceneProperties> = ({ camRadius, camAzi, camInc, camFov, camClip }) => {

    const cameraRef = useRef<PerspectiveCamera>(null!);
    useHelper(cameraRef, CameraHelper);
    const controlRef = useRef<any>(null!);

    useEffect(() => {
        cameraRef.current?.layers.disableAll();
        cameraRef.current?.layers.enable(1);
    });

    const getSphereXyz = (radius: number, azi: number, inc: number) => {
        return [radius * Math.sin(inc) * Math.cos(azi), radius * Math.sin(inc) * Math.sin(azi), radius * Math.cos(inc)];
    }

    useFrame(() => {
        // Limit camera transform to camera spheres
        const posVec = controlRef.current.object.position as Vector3;
        const radius = posVec.length();
        const azimuth = (Math.atan2(posVec.y, posVec.x) + 2 * Math.PI) % (2 * Math.PI);
        const elevation = -(Math.atan2(posVec.z, Math.sqrt(posVec.x * posVec.x + posVec.y * posVec.y)) - Math.PI / 2);

        if (radius == 0) {
            return;
        }

        if (radius > camRadius.max) {
            posVec.multiplyScalar(camRadius.max / radius);
        }
        if (radius < camRadius.min) {
            posVec.multiplyScalar(camRadius.min / radius);
        }
        
        const newAzi = azimuth < camAzi.min ? camAzi.min : (azimuth > camAzi.max ? camAzi.max : azimuth);
        const newInc = elevation < camInc.min ? camInc.min : (elevation > camInc.max ? camInc.max : elevation);
        const newPos = getSphereXyz(posVec.length(), newAzi, newInc);
        posVec.set(newPos[0], newPos[1], newPos[2]);

        // Look at 0,0,0
        cameraRef.current.lookAt(new Vector3(0,0,0));
    });

    return <>
        <TransformControls ref={controlRef}> 
            <perspectiveCamera up={[0, 0, 1]} ref={cameraRef} fov={camFov.value} near={camClip.min} far={camClip.max} />
        </TransformControls>
        
        <RenderCameraControls renderCameraRef={cameraRef} />
        <RenderPreview renderCameraRef={cameraRef} />
    </>;
};

export default RenderCamera;
