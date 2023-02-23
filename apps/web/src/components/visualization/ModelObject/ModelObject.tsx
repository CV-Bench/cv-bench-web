import React from "react";
import ObjModel from "./ObjModel";
import PlyModel from "./PlyModel";
import * as THREE from 'three';
import { DataUrlFile } from "types";

export interface ModelObjectProps {
  model: DataUrlFile | string;
  modelAssets?: DataUrlFile[] | string[];
  onUpdate?: (obj: THREE.Object3D) => void;
}

const ModelObject: React.FC<ModelObjectProps> = ({ model, modelAssets, onUpdate }) => {
  const mapStringToUrlFile = (pathOrUrlFile: DataUrlFile | string) => 
    typeof pathOrUrlFile == 'string' ? { filename: pathOrUrlFile.replace(/^.*[\\\/]/, ''), url: pathOrUrlFile } : pathOrUrlFile
  
  const urlModel = mapStringToUrlFile(model);
  const fileExt = urlModel.filename.toLocaleLowerCase().split('.').pop();
  const urlMaterials = modelAssets?.map(mapStringToUrlFile);

  switch (fileExt) {
    case 'obj':
      return (<ObjModel onUpdate={onUpdate} model={urlModel} modelAssets={urlMaterials} />)
    case 'ply':
      return (<PlyModel onUpdate={onUpdate} model={urlModel} />)
    default:
      console.error("Invalid file format");
      return (<></>)
  }

};

export default ModelObject;
