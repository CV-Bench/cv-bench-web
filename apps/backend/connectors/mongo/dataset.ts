import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { CollectionName, DatasetDb } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";


prepareCollection(CollectionName.DATASET).then((collection) => {
  logger.debug("MONGO CLIENT", `Collection Ready: ${collection.namespace}`);
});

/**
 * @param id The id of the dataset being requested
 * @returns The requested dataset from the database
 */
const getDataset = (id: string) => {
  return collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.findOne({ _id: new ObjectId(id) });
  });
};

/**
 * @param dataset The dataset to be insterted
 * @returns InsertOneResult
 */
const insertDataset = (dataset: DatasetDb) => {
  return collectionRequest<InsertOneResult>(CollectionName.DATASET, async (collection) => {
    return collection.insertOne(dataset);
  });
};

const Dataset = {
  get: getDataset,
  insert: insertDataset,
};

export default Dataset;
