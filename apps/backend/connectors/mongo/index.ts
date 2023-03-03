import { CollectionName, loggerTitle } from "shared-types";

import logger from "../../util/logger";

import Background from "./background";
import { prepareCollection } from "./client";
import Dataset from "./dataset";
import Model from "./model";
import NetworkArchitecture from "./networkArchitecture";
import Socket from "./socket";
import User from "./user";
import Notification from "./notification"

export { cvBenchDb, clientNotReady, collectionRequest } from "./client";

Object.values(CollectionName).map((name) =>
  prepareCollection(name).then((collection) => {
    logger.debug(
      loggerTitle.MONGO_CLIENT,
      `Collection Ready: ${collection.namespace}`
    );
  })
);

const Database = {
  Model,
  Dataset,
  User,
  Background,
  NetworkArchitecture,
  Notification,
  Socket
};

export default Database;
