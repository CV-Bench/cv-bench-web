import { Collection } from "mongodb";

export enum CollectionName {
  MODEL = "models",
  BACKGROUND = "backgrounds",
  USER = "users",
  DATASET = "datasets",
  DATASET_CONFIGURATION = "datasetConfigurations",
  NETWORK = "networks",
  TASK = "tasks",
  NETWORK_ARCHITECTURE = "networkArchitecture",
  SOCKET = "sockets"
}

export type CollectionCollection = { [name in CollectionName]?: Collection };
