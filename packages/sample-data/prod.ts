import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

import { CollectionName, DatasetFormat } from "types";

dotenv.config({ path: "../../.env" });

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URL || "");

const createNetworkArchitectures = (db: Db) => {
  db.collection(CollectionName.NETWORK_ARCHITECTURE).deleteMany({});

  const now = new Date();

  const networks = [
    {
      name: "FasterRCCN",
      description: "",
      identifier: "fasterrcnn",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "RetinaNet",
      description: "",
      identifier: "retinanet",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    }
  ];

  db.collection(CollectionName.NETWORK_ARCHITECTURE).insertMany(networks);
};

const main = async (db: Db) => {
  await Promise.all([createNetworkArchitectures(db)]);

  console.log("FINISHED");
};

mongoClient
  .connect()
  .then((client) => main(client.db(process.env.MONGO_DATABASE_NAME)));
