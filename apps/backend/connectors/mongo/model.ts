import { Collection, ObjectId } from "mongodb";
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
const getModel = (id: string) => {
  return collectionRequest(MODEL_COLLECTION_NAME, async () => {
    return modelCollection.findOne({ _id: new ObjectId(id) });
  });
};

/**
 * @param model The model to be insterted
 * @returns Resolves if successful, rejects if not
 */
const insertModel = (model: any) => {
  return collectionRequest(MODEL_COLLECTION_NAME, async () => {
    return modelCollection.insertOne(model);
  });
};

const Model = {
  get: getModel,
  insert: insertModel,
};

getModel("63F4BB37490C602A82740B43");

export default Model;
