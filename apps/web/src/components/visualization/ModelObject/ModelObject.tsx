import React, { Suspense, useState } from "react";
import ObjModel from "./ObjModel";
import PlyModel from "./PlyModel";

export interface ModelObjectProps {
  modelPath: string;
  materialPaths?: string[];
}

const ModelObject: React.FC<ModelObjectProps> = ({ modelPath, materialPaths }) => {
  const fileExt = modelPath.toLocaleLowerCase().split('.').pop();

  switch (fileExt) {
    case 'obj':
      return (<ObjModel modelPath={modelPath} materialPaths={materialPaths}/>)
    case 'ply':
      return (<PlyModel modelPath={modelPath} />)
    default:
      console.error("Invalid file format");
      return (<></>)
  }

};

export default ModelObject;
