export {
  cvBenchDb,
  clientNotReady,
  prepareCollection,
  collectionRequest,
} from "./client";

import Model from "./model";
import Dataset from "./dataset";
import User from "./user";
import Background from "./background";

const Database = { Model, Dataset, User, Background };

export default Database;
