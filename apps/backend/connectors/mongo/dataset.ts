import { Collection, ObjectId } from "mongodb";
import { DatasetDb } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";

let datasetCollection: Collection;

const DATASET_COLLECTION_NAME = "models";

prepareCollection(DATASET_COLLECTION_NAME).then((collection) => {
  logger.debug("MONGO CLIENT", `Collection Ready: ${collection.namespace}`);
  datasetCollection = collection;
});

/**
 * @param id The id of the dataset being requested
 * @returns The requested dataset from the database
 */
const getDataset = (id: string):Promise<DatasetDb> => {
  return collectionRequest(DATASET_COLLECTION_NAME, async () => {
    return datasetCollection.findOne({ _id: new ObjectId(id) });
  }) as Promise<DatasetDb>;
};

/**
 * @param dataset The dataset to be insterted
 * @returns Resolves if successful, rejects if not
 */
const insertDataset = (dataset: DatasetDb) => {
  return collectionRequest(DATASET_COLLECTION_NAME, async () => {
    return datasetCollection.insertOne(dataset);
  });
};

const Dataset = {
  get: getDataset,
  insert: insertDataset,
};

export default Dataset;
