import { Bucket } from "types";

import { putObject, getObject, deleteObject } from ".";
import { OmitFirst } from "types/src/utils";

const putModel = (...args: OmitFirst<Parameters<typeof putObject>>) =>
  putObject(Bucket.MODELS, ...args);

const deleteModel = (...args: OmitFirst<Parameters<typeof deleteObject>>) =>
  deleteObject(Bucket.MODELS, ...args);

const getModel = (...args: OmitFirst<Parameters<typeof getObject>>) =>
  getObject(Bucket.MODELS, ...args);

export const Model = {
  put: putModel,
  deleteModel: deleteModel,
  getModel: getModel,
};
