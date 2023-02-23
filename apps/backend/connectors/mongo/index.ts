export {
  cvBenchDb,
  clientNotReady,
  prepareCollection,
  collectionRequest,
} from "./client";

import { default as Model } from "./model";
import { default as Dataset } from "./dataset";

const Database = { Model, Dataset };

export default Database;
