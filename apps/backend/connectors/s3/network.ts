import { putObject, getObject, deleteObject } from ".";

import { Bucket } from "shared-types";
import { OmitFirst } from "shared-types/src/utils";

const putNetwork = (...args: OmitFirst<Parameters<typeof putObject>>) =>
  putObject(Bucket.NETWORKS, ...args);

const deleteNetwork = (...args: OmitFirst<Parameters<typeof deleteObject>>) =>
  deleteObject(Bucket.NETWORKS, ...args);

const getNetwork = (...args: OmitFirst<Parameters<typeof getObject>>) =>
  getObject(Bucket.NETWORKS, ...args);

export const Network = {
  put: putNetwork,
  delete: deleteNetwork,
  get: getNetwork
};
