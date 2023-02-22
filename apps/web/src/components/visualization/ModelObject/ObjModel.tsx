import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { UrlFile } from "@/components/inputs/FileInput";
import React, { useState } from "react";
import * as THREE from 'three';

export interface ObjModelProps {
  model: UrlFile;
  modelAssets?: UrlFile[];
  onUpdate?: (obj: THREE.Object3D) => void;
}

export interface ObjModelState {
  threeModel?: THREE.Group;
  model?: UrlFile;
  modelAssets?: UrlFile[];
}

const ObjModel: React.FC<ObjModelProps> = ({ model, modelAssets, onUpdate }) => {
  const [state, setState] = useState<ObjModelState>({});

  // As THREE is loading Textures relative to the mtl path, we need to adapt this to our data URLs
  const fixDataURL = (url: string) => {
    const isInvalid = /data:application\/.+\.[a-zA-Z]+/gm.test(url);
    if (isInvalid) {
      const filename = url.replace(/^.*[\\\/]/, '');
      const findFile = modelAssets?.find(x => x.filename == filename);
      if (findFile) {
        return findFile.url;
      }
      console.error("Found missing url for file ", filename);
    }
    return url;
  }

  const loadObj = async () => {
    const manager = new THREE.LoadingManager();
    const objLoader = new OBJLoader(manager);
    manager.setURLModifier(fixDataURL);

    if (modelAssets) {
      const mtlLoader = new MTLLoader(manager);
      const materials = modelAssets.filter(x => x.filename.toLowerCase().endsWith('mtl'));
      const loadedMtls = await Promise.all(materials.map(async mat => await mtlLoader.loadAsync(mat.url)));
      loadedMtls.forEach(x => {
        x.preload();
        objLoader.setMaterials(x);
      });
    }

    const objModel = await objLoader.loadAsync(model.url);

    setState({
      model,
      modelAssets,
      threeModel: objModel
    });
  }

  // Only reload object if actual paths have changed
  const compareUrlFile = (a?: UrlFile, b?: UrlFile) => a?.url == b?.url;
  const compareUrlFiles = (a: UrlFile[], b: UrlFile[]) => a.length == b.length && a?.every((x, i) => compareUrlFile(x, b[i]));
  if (!compareUrlFile(model, state.model) || !compareUrlFiles(state.modelAssets ?? [], modelAssets ?? [])) {
    loadObj();
  }

  return (<>
    {state.threeModel && <primitive onUpdate={onUpdate} layers={1} object={state.threeModel} />}
  </>)
};

export default ObjModel;
