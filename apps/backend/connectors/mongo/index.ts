export {
  cvBenchDb,
  clientNotReady,
  prepareCollection,
  collectionRequest,
} from "./client";

import { default as Model } from "./model";
import { default as Dataset } from "./dataset";
import Socket from "./socket";

const Database = { Model, Dataset, Socket };

export default Database;
