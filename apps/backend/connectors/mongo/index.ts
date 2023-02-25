export {
  cvBenchDb,
  clientNotReady,
  prepareCollection,
  collectionRequest,
} from "./client";

import { default as Model } from "./model";
import { default as Dataset } from "./dataset";
import { default as User } from "./user";

const Database = { Model, Dataset, User };

export default Database;
