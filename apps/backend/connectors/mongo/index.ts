export {
  cvBenchDb,
  clientNotReady,
  prepareCollection,
  collectionRequest,
} from "./client";

import Model from "./model";
import Dataset from "./dataset";
import Background from "./background";

const Database = { Model, Dataset, Background };

export default Database;
