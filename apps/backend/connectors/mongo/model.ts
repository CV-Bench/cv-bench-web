import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { CollectionName, loggerTitle, ModelDb } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";


prepareCollection(CollectionName.MODEL).then((collection) => {
  logger.debug(loggerTitle.MONGO_CLIENT, `Collection Ready: ${collection.namespace}`);
});

/**
 * @param id The id of the model being requested
 * @returns The requested model from the database
 */
const getModel = (id: string) => {
  return collectionRequest<ModelDb>(CollectionName.MODEL, async (collection) => {
    return collection.findOne({ _id: new ObjectId(id) })
  });
};

/**
 * @param model The model to be insterted
 * @returns InsertOneResult
 */
const insertModel = (model: ModelDb) => {
  return collectionRequest<InsertOneResult>(CollectionName.MODEL, async (collection) => {
    return collection.insertOne(model);
  });
};

const Model = {
  get: getModel,
  insert: insertModel,
};

export default Model;
