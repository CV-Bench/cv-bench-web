import { FindCursor } from "mongodb";

import {
  CollectionName,
  loggerTitle,
  NetworkArchitecture as NetworkArchitectureType
} from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./client";

const find = () =>
  collectionRequest<FindCursor<NetworkArchitectureType>>(
    CollectionName.NETWORK_ARCHITECTURE,
    async (collection) => {
      return collection.find();
    }
  );

const NetworkArchitecture = {
  find
};

export default NetworkArchitecture;
