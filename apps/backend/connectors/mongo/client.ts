import { Collection, Db, MongoClient } from "mongodb";
import { CollectionCollection, CollectionName } from ".";
import logger from "../../util/logger";

/**
 * @see https://www.npmjs.com/package/mongodb
 */
const mongoClient = new MongoClient("mongodb://localhost:27017");

export const cvBenchDb = new Promise<Db>((resolve, reject) => {
  mongoClient
    .connect()
    .then(() => {
      logger.info("MONGO CLIENT", "Client connected");

      resolve(mongoClient.db("cvBench"));
    })
    .catch((e) => {
      reject(e);
      logger.error("MONGO CLIENT", e);
    });
});

let collections: CollectionCollection = {};

export const prepareCollection = (collectionName: CollectionName) => {
  logger.debug("MONGO CLIENT", `Preparing Collection: ${collectionName}`);
  return new Promise<Collection>((resolve, reject) => {
    cvBenchDb
      .then((db) => {
        const col = db.collection(collectionName);
        resolve(col);
        collections[collectionName] = col;
      })
      .catch((e) => {
        reject(e);
        logger.error(
          "MONGO CLIENT",
          `Error Preparing Collection: ${collectionName}`,
          e
        );
      });
  });
};

export const collectionRequest = (
  collectionName: CollectionName,
  request: () => Promise<any>
) => {
  return new Promise((resolve, reject) => {
    if (!collections[collectionName]) {
      clientNotReady().then(
        () => {
          resolve(collectionRequest(collectionName, request));
        },
        (e: any) => reject(e)
      );
      return;
    }

    request()
      .then((result) => {
        resolve(result);
        logger.debug(
          "MONGO CLIENT",
          "Collection Request Resolved!",
          `Collection: ${collectionName}`,
          `Result: ${JSON.stringify(result)}`
        );
      })
      .catch((e) => {
        reject(e);
        logger.error(
          "MONGO CLIENT",
          "Collection Request Failed!",
          `Collection: ${collectionName}`,
          e
        );
      });
  });
};

/**
 * @returns Resolves once the mongo db is ready
 * @description Is used to defer database actions
 */
export const clientNotReady = () => {
  logger.warning("MONGO CLIENT", "Mongo Client wasn't ready!");

  return new Promise((resolve, reject) => {
    cvBenchDb
      .then(() => {
        setTimeout(() => {
          logger.debug("MONGO CLIENT", "Mongo Client ready!");
          resolve(true);
        }, 100);
      })
      .catch((e) => reject(e));
  });
};

export default mongoClient;
