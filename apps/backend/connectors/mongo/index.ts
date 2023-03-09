import { CollectionName, DataType, loggerTitle } from "shared-types";

import logger from "../../util/logger";

import Background from "./background";
import { prepareCollection } from "./client";
import Dataset from "./dataset";
import DatasetConfiguration from "./datasetConfiguration";
import DatasetPreview from "./datasetPreview";
import Model from "./model";
import Network from "./network";
import NetworkArchitecture from "./networkArchitecture";
import NetworkPreview from "./networkPreview";
import Notification from "./notification";
import Socket from "./socket";
import Task from "./task";
import TaskLog from "./taskLog";
import User from "./user";

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
  DatasetConfiguration,
  DatasetPreview,
  User,
  Background,
  NetworkArchitecture,
  Notification,
  Socket,
  Task,
  Network,
  NetworkPreview,
  TaskLog
};

export const dataTypeCollectionMap = (dataType: DataType) =>
  ({
    [DataType.DATASET]: "Dataset",
    [DataType.NETWORK]: "Network"
  }[dataType] as "Dataset" | "Network");

export default Database;
