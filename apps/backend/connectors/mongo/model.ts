import { Collection, ObjectId } from "mongodb";
import { ModelDb } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";

let modelCollection: Collection;

const MODEL_COLLECTION_NAME = "models";

prepareCollection(MODEL_COLLECTION_NAME).then((collection) => {
  logger.debug("MONGO CLIENT", `Collection Ready: ${collection.namespace}`);
  modelCollection = collection;
});

/**
 * @param id The id of the model being requested
 * @returns The requested model from the database
 */
const getModel = (id: string):Promise<ModelDb> => {
  return collectionRequest(MODEL_COLLECTION_NAME, async () => {
    return modelCollection.findOne({ _id: new ObjectId(id) });
  }) as Promise<ModelDb>;
};

/**
 * @param model The model to be insterted
 * @returns Resolves if successful, rejects if not
 */
const insertModel = (model: ModelDb) => {
  return collectionRequest(MODEL_COLLECTION_NAME, async () => {
    return modelCollection.insertOne(model);
  });
};

const Model = {
  get: getModel,
  insert: insertModel,
};

export default Model;
