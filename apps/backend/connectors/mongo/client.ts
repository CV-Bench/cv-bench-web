import { Collection, Db, MongoClient } from "mongodb";
import { CollectionCollection, CollectionName, loggerTitle } from "types";
import logger from "../../util/logger";

/**
 * @see https://www.npmjs.com/package/mongodb
 */

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URL || "");

export const cvBenchDb = new Promise<Db>((resolve, reject) => {
  mongoClient
    .connect()
    .then(() => {
      logger.info(loggerTitle.MONGO_CLIENT, "Client connected");

      resolve(mongoClient.db(process.env.MONGO_DATABASE_NAME));
    })
    .catch((e) => {
      reject(e);
      logger.error(loggerTitle.MONGO_CLIENT, e);
    });
});

let collections: CollectionCollection = {};

export const prepareCollection = (collectionName: CollectionName) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Preparing Collection: ${collectionName}`
  );
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
          loggerTitle.MONGO_CLIENT,
          `Error Preparing Collection: ${collectionName}`,
          e
        );
      });
  });
};

export const collectionRequest = <T>(
  collectionName: CollectionName,
  request: (collection: Collection) => Promise<any>
): Promise<T> => {
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

    request(collections[collectionName]!)
      .then((result: T) => {
        resolve(result);
        logger.debug(
          loggerTitle.MONGO_CLIENT,
          "Collection Request Resolved!",
          `Collection: ${collectionName}`,
          `Result: ${JSON.stringify(result)}`
        );
      })
      .catch((e) => {
        reject(e);
        logger.error(
          loggerTitle.MONGO_CLIENT,
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
  logger.warning(loggerTitle.MONGO_CLIENT, "Mongo Client wasn't ready!");

  return new Promise((resolve, reject) => {
    cvBenchDb
      .then(() => {
        setTimeout(() => {
          logger.debug(loggerTitle.MONGO_CLIENT, "Mongo Client ready!");
          resolve(true);
        }, 100);
      })
      .catch((e) => reject(e));
  });
};
