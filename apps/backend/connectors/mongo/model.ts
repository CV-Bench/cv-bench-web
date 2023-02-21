import { Collection, ObjectId } from "mongodb";
import logger from "../../util/logger";
import mongo, { clientNotReady } from "./";
import mongoClient, { cvBenchDb } from "./";

export let modelCollection: Collection;

new Promise<Collection>((resolve, reject) => {
  cvBenchDb.then((db) => resolve(db.collection("models")));
}).then((collection) => {
  modelCollection = collection;
});

/**
 * @param id The id of the model being requested
 * @returns The requested model from the database
 */
const getModel = (id: string) => {
  return new Promise((resolve, reject) => {
    if (!modelCollection) {
        clientNotReady().then(
          () => {
            resolve(getModel(id));
          },
          (e: any) => reject(e)
        );
        return;
      }

    modelCollection
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

/**
 * @param model The model to be insterted
 * @returns Resolves if successful, rejects if not
 */
const insertModel = (model: any) => {
  logger.debug("MONGO CLIENT", "insert");

  return new Promise((resolve, reject) => {
    if (!modelCollection) {
      clientNotReady().then(
        () => {
          resolve(insertModel(model));
        },
        (e: any) => reject(e)
      );
      return;
    }
    modelCollection
      .insertOne(model)
      .then(resolve)
      .catch((e) => reject(e));
  });
};

const Model = {
  get: getModel,
  insert: insertModel,
};

export default Model;
