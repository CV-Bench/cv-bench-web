import { SelectedFile } from "@/components/inputs/FileInput";
import React, { Ref, Suspense, useState } from "react";
import ObjModel from "./ObjModel";
import PlyModel from "./PlyModel";

export interface ModelObjectProps {
  model: SelectedFile | string;
  materials?: SelectedFile[] | string[];
}

const ModelObject: React.FC<ModelObjectProps> = ({ model, materials }) => {
  const filePath = typeof model == 'string' ? model : model.data;
  const fileName = typeof model == 'string' ? model : model.filename;
  const fileExt = fileName.toLocaleLowerCase().split('.').pop();
  const materialPaths = materials?.map(x => typeof x === 'string' ? x : x.data);

  switch (fileExt) {
    case 'obj':
      return (<ObjModel modelPath={filePath} materialPaths={materialPaths} />)
    case 'ply':
      return (<PlyModel model={filePath} />)
    default:
      console.error("Invalid file format");
      return (<></>)
  }

};

export default ModelObject;
