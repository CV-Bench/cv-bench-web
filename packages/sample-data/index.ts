import { S3 as _S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";
import { LoremIpsum } from "lorem-ipsum";
import { ObjectId } from "mongodb";
import { Db, MongoClient } from "mongodb";

import {
  AccessType,
  ModelType,
  ModelDb,
  CollectionName,
  BackgroundDb,
  Bucket,
  createBucketKey
} from "types";

import { backgroundPreview } from "./data/backgroundPreview";
import { modelPreview } from "./data/modelPreview";

dotenv.config({ path: "../../.env" });

const userId = new ObjectId();

export const s3Client = new _S3({
  endpoint: process.env.S3_ENDPOINT_URL,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URL || "");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const createModelsAmount = 5;
const createBackgroundsAmount = 5;

const objectFiles: [Buffer, string][] = [
  [fs.readFileSync("./data/models/airplane.ply"), "airplane.ply"],
  [fs.readFileSync("./data/models/big_dolphin.ply"), "big_dolphin.ply"],
  [fs.readFileSync("./data/models/teapot.obj"), "teapot.obj"]
];

const backgroundFiles: [Buffer, string][] = [
  [fs.readFileSync("./data/background/1.png"), "1.png"],
  [fs.readFileSync("./data/background/2.png"), "2.png"],
  [fs.readFileSync("./data/background/3.png"), "3.png"]
];

// Create Sample Models
const createModels = async (db: Db) => {
  const newModels = [] as ModelDb[];
  const newModelsS3 = [] as Promise<any>[];

  for (let i = 0; i < createModelsAmount; i++) {
    const id = new ObjectId();

    const newModel: ModelDb = {
      _id: id,
      userId: Math.random() < 0.1 ? undefined : userId,
      name: lorem.generateWords(Math.floor(Math.random() * 2 + 1)),
      description: lorem.generateSentences(2),
      domainTags: [...new Array(Math.floor(Math.random() * 10) + 1)].map(() =>
        lorem.generateWords(1)
      ),
      accessType: Math.random() < 0.3 ? AccessType.PRIVATE : AccessType.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
      modelType: ModelType["3D"],
      previewImage: modelPreview
    };

    const obj = objectFiles[Math.floor(Math.random() * objectFiles.length)];
    const filename = obj[1].split(".");

    newModelsS3.push(
      s3Client.putObject({
        Bucket: process.env.BUCKET_NAME,
        Body: obj[0],
        Key: createBucketKey(
          Bucket.MODELS,
          id + "." + filename[filename.length - 1]
        )
      })
    );
    newModels.push(newModel);
  }

  await Promise.all([
    db.collection(CollectionName.MODEL).insertMany(newModels),
    ...newModelsS3
  ]);
};

// Create Sample Backgrounds
const createBackgrounds = async (db: Db) => {
  const newBackgrounds = [] as BackgroundDb[];
  const newBackgroundsS3 = [] as Promise<any>[];

  for (let i = 0; i < createBackgroundsAmount; i++) {
    const id = new ObjectId();

    const newBackground: BackgroundDb = {
      _id: id,
      userId: Math.random() < 0.1 ? undefined : userId,
      name: lorem.generateWords(Math.floor(Math.random() * 2 + 1)),
      domainTags: [...new Array(Math.floor(Math.random() * 10) + 1)].map(() =>
        lorem.generateWords(1)
      ),
      accessType: Math.random() < 0.3 ? AccessType.PRIVATE : AccessType.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
      previewImage:
        backgroundPreview[Math.floor(Math.random() * backgroundPreview.length)]
    };

    const obj =
      backgroundFiles[Math.floor(Math.random() * backgroundFiles.length)];
    const filename = obj[1].split(".");

    newBackgroundsS3.push(
      s3Client.putObject({
        Bucket: process.env.BUCKET_NAME,
        Body: obj[0],
        Key: createBucketKey(
          Bucket.BACKGROUNDS,
          id + "." + filename[filename.length - 1]
        )
      })
    );
    newBackgrounds.push(newBackground);
  }

  await Promise.all([
    db.collection(CollectionName.BACKGROUND).insertMany(newBackgrounds),
    ...newBackgroundsS3
  ]);
};

const main = async (db: Db) => {
  await Promise.all([createModels(db), createBackgrounds(db)]);

  console.log("FINISHED");
};

mongoClient
  .connect()
  .then((client) => main(client.db(process.env.MONGO_DATABASE_NAME)));
