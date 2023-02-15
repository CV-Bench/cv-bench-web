import { MongoClient } from "mongodb";
import logger from "../util/logger";

/**
 * @see https://www.npmjs.com/package/mongodb
 */
const mongoClient = new MongoClient("mongodb://localhost:27017");

async () => {
  mongoClient
    .connect()
    .then(() => {
      logger.info("MONGO CLIENT", "Client connected");

      //sample
      const db = mongoClient.db("dbname");
      const collection = db.collection("collectionname");
    })
    .catch((e) => {
      logger.error("MONGO CLIENT", e);
    });
};

export default mongoClient;
