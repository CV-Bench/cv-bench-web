import { putObject, getObject, deleteObject, listObjects } from ".";

import { Bucket } from "shared-types";
import { OmitFirst } from "shared-types/src/utils";

const putModel = (...args: OmitFirst<Parameters<typeof putObject>>) =>
  putObject(Bucket.MODELS, ...args);

const deleteModel = (...args: OmitFirst<Parameters<typeof deleteObject>>) =>
  deleteObject(Bucket.MODELS, ...args);

const getModel = (...args: OmitFirst<Parameters<typeof getObject>>) =>
  getObject(Bucket.MODELS, ...args);

const listModels = (...args: OmitFirst<Parameters<typeof listObjects>>) =>
  listObjects(Bucket.MODELS, ...args);

export const Model = {
  put: putModel,
  delete: deleteModel,
  get: getModel,
  list: listModels
};
