import { Collection } from "mongodb";

export enum CollectionName {
  MODEL = "models",
  BACKGROUND = "backgrounds",
  USER = "users",
  DATASET = "datasets",
  NETWORK = "networks",
  TASK = "tasks",
  NETWORK_ARCHITECTURE = "networkArchitecture",
  NOTIFICATION = "notification"
}

export type CollectionCollection = { [name in CollectionName]?: Collection };
