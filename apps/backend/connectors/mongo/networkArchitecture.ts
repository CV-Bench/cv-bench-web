import { FindCursor } from "mongodb";

import {
  CollectionName,
  loggerTitle,
  NetworkArchitecture as NetworkArchitectureType
} from "types";

import logger from "../../util/logger";

import { prepareCollection, collectionRequest } from "./client";

prepareCollection(CollectionName.NETWORK_ARCHITECTURE).then((collection) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Collection Ready: ${collection.namespace}`
  );
});

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
