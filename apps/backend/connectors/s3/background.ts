import { putObject, getObject, deleteObject } from ".";

import { Bucket } from "shared-types";
import { OmitFirst } from "shared-types/src/utils";

const putBackground = (...args: OmitFirst<Parameters<typeof putObject>>) =>
  putObject(Bucket.BACKGROUNDS, ...args);

const deleteBackground = (
  ...args: OmitFirst<Parameters<typeof deleteObject>>
) => deleteObject(Bucket.BACKGROUNDS, ...args);

const getBackground = (...args: OmitFirst<Parameters<typeof getObject>>) =>
  getObject(Bucket.BACKGROUNDS, ...args);

export const Background = {
  put: putBackground,
  delete: deleteBackground,
  get: getBackground
};
