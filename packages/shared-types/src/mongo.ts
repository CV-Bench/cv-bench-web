import { Collection } from "mongodb";

import { DataType } from "./utils";

export enum CollectionName {
  MODEL = "models",
  BACKGROUND = "backgrounds",
  USER = "users",
  DATASET = "datasets",
  DATASET_CONFIGURATION = "datasetConfigurations",
  DATASET_PREVIEW = "datasetPreview",
  NETWORK_PREVIEW = "networkPreview",
  NETWORK = "networks",
  TASK = "tasks",
  NETWORK_ARCHITECTURE = "networkArchitecture",
  NOTIFICATION = "notification",
  SOCKET = "sockets",
  TASK_LOG = "taskLog"
}

export type CollectionCollection = { [name in CollectionName]?: Collection };

export enum DatabaseCollectionEntries {
  Model = "Model",
  Dataset = "Dataset",
  DatasetConfiguration = "DatasetConfiguration",
  User = "User",
  Background = "Background",
  NetworkArchitecture = "NetworkArchitecture",
  DatasetPreview = "DatasetPreview",
  NetworkPreview = "NetworkPreview",
  Socket = "Socket",
  Task = "Task",
  Network = "Network",
  TaskLog = "TaskLog"
}
