import { Db, MongoClient } from "mongodb";
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

/**
 * @returns Resolves once the mongo db is ready
 * @description Is used to defer database actions
 */
export const clientNotReady = () => {
  logger.warning("MONGO CLIENT", "Mongo Client wasn't ready!");

  return new Promise((resolve, reject) => {
    cvBenchDb.then(() => {
      setTimeout(() => {
        logger.debug("MONGO CLIENT", "Mongo Client ready!");
        resolve(true);
      }, 100);
    });
    mongoClient.on("connectionClosed", () =>
      reject("Mongo Connection closed!")
    );
  });
};

export default mongoClient;
