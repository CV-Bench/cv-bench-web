import {
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import {
  CollectionName,
  DatasetConfigurationDb,
} from "shared-types";

import { collectionRequest } from "./";

const findOne = (id: string | ObjectId, userId: string) =>
  collectionRequest<DatasetConfigurationDb>(
    CollectionName.DATASET_CONFIGURATION,
    async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    }
  );

const insert = (
  model: Omit<DatasetConfigurationDb, "_id" | "updatedAt" | "createdAt">,
  userId: string
) =>
  collectionRequest<InsertOneResult>(
    CollectionName.DATASET_CONFIGURATION,
    async (collection) => {
      return collection.insertOne({
        ...model,
        userId: new ObjectId(userId),
        updatedAt: new Date(),
        createdAt: new Date()
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string,
  update: Partial<DatasetConfigurationDb>
) =>
  collectionRequest<UpdateResult>(
    CollectionName.DATASET_CONFIGURATION,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id),
          userId: new ObjectId(userId)
        },
        {
          $set: {
            ...update,
            userId: new ObjectId(userId),
            updatedAt: new Date()
          }
        }
      );
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(
    CollectionName.DATASET_CONFIGURATION,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<DatasetConfigurationDb>>(
    CollectionName.DATASET_CONFIGURATION,
    async (collection) => {
      return collection.find({
        userId: new ObjectId(userId)
      });
    }
  );

const DatasetConfiguration = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find
};

export default DatasetConfiguration;
