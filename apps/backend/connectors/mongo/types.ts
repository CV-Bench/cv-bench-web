//TODO TEMPORARY TYPES FILE! NEEDS TO BE MOVED TO APPROPRIATE LOCATION

import { Collection } from "mongodb";

export type CollectionName = "models" | "users" | "datasets" | "networks";

export type CollectionCollection = {[name in CollectionName]?: Collection};