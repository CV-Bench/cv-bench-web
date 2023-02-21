import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import React from "react";
import { ModelObjectProps } from "./ModelObject";


const ObjModel: React.FC<ModelObjectProps> = ({ modelPath, materialPaths }) => {

  const loadObjAndSetMaterials = (objLoader: OBJLoader, materials: MTLLoader.MaterialCreator[] | null) => {
    if (!materials) {
      return;
    }
    materials.forEach(mtlCreator => {
      mtlCreator.preload();
      
      objLoader.setMaterials(mtlCreator);
    });
  }

  const materials = materialPaths ? useLoader(MTLLoader, materialPaths) : null;
  const object = useLoader(OBJLoader, modelPath, (loader) => loadObjAndSetMaterials(loader, materials));

  return (<primitive layers={1} object={object} />)
};

export default ObjModel;
