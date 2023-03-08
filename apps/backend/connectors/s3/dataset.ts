import { putObject, getObject, deleteObject } from ".";

import { Bucket } from "shared-types";
import { OmitFirst } from "shared-types/src/utils";

const putDataset = (...args: OmitFirst<Parameters<typeof putObject>>) =>
  putObject(Bucket.DATASETS, ...args);

const deleteDataset = (
  ...args: OmitFirst<Parameters<typeof deleteObject>>
) => deleteObject(Bucket.DATASETS, ...args);

const getDataset = (...args: OmitFirst<Parameters<typeof getObject>>) =>
  getObject(Bucket.DATASETS, ...args);

export const Dataset = {
  put: putDataset,
  delete: deleteDataset,
  get: getDataset
};
