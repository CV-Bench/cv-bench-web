import React, { useState } from "react";
import { LoadingManager } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { DataUrlFile } from "types";

export interface ObjModelProps {
  model: DataUrlFile;
  modelAssets?: DataUrlFile[];

  onUpdate?: (obj: THREE.Object3D) => void;
}

export interface ObjModelState {
  threeModel?: THREE.Group;
  model?: DataUrlFile;
  modelAssets?: DataUrlFile[];
}

const ObjModel: React.FC<ObjModelProps> = ({
  model,
  modelAssets,
  onUpdate
}) => {
  const [state, setState] = useState<ObjModelState>({});

  // As THREE is loading Textures relative to the mtl path, we need to adapt this to our data URLs
  const fixDataURL = (url: string) => {
    const isInvalid = /data:application\/.+\.[a-zA-Z]+/gm.test(url);
    if (isInvalid) {
      const filename = url.replace(/^.*[\\\/]/, "");
      const findFile = modelAssets?.find((x) => x.filename == filename);
      if (findFile) {
        return findFile.dataUrl;
      }
      console.error("Found missing url for file ", filename);
    }
    return url;
  };

  const loadObj = async () => {
    const manager = new LoadingManager();
    const objLoader = new OBJLoader(manager);
    manager.setURLModifier(fixDataURL);

    if (modelAssets) {
      const mtlLoader = new MTLLoader(manager);
      const materials = modelAssets.filter((x) =>
        x.filename.toLowerCase().endsWith("mtl")
      );
      const loadedMtls = await Promise.all(
        materials.map(async (mat) => await mtlLoader.loadAsync(mat.dataUrl))
      );
      loadedMtls.forEach((x) => {
        x.preload();
        objLoader.setMaterials(x);
      });
    }

    const objModel = await objLoader.loadAsync(model.dataUrl);

    setState({
      model,
      modelAssets,
      threeModel: objModel
    });
  };

  // Only reload object if actual paths have changed
  const compareUrlFile = (a?: DataUrlFile, b?: DataUrlFile) =>
    a?.dataUrl == b?.dataUrl;
  const compareUrlFiles = (a: DataUrlFile[], b: DataUrlFile[]) =>
    a.length == b.length && a?.every((x, i) => compareUrlFile(x, b[i]));
  if (
    !compareUrlFile(model, state.model) ||
    !compareUrlFiles(state.modelAssets ?? [], modelAssets ?? [])
  ) {
    loadObj();
  }

  return (
    <>
      {state.threeModel && (
        <primitive onUpdate={onUpdate} layers={1} object={state.threeModel} />
      )}
    </>
  );
};

export default ObjModel;
