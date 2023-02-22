import { Collection } from "mongodb";

export enum CollectionName {
  MODEL = "models",
  BACKGROUNDS = "backgrounds",
  USER = "users",
  DATASET = "datasets",
  NETWORK = "networks",
}

export type CollectionCollection = { [name in CollectionName]?: Collection };
