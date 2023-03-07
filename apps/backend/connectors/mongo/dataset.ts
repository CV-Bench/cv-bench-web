import {
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import {
  AccessType,
  CollectionName,
  DatasetDb,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const findOne = (id: string | ObjectId, userId: string | undefined) =>
  collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...(userId ? isUsersOrPublic(userId) : {})
    });
  });

const insert = (model: Omit<DatasetDb, "updatedAt" | "createdAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.DATASET,
    async (collection) => {
      return collection.insertOne({
        ...model,
        updatedAt: new Date(),
        createdAt: new Date()
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId | undefined,
  update: Partial<DatasetDb>
) =>
  collectionRequest<UpdateResult>(
    CollectionName.DATASET,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id),
          ...(userId ? { userId: new ObjectId(userId) } : {})
        },
        { $set: { ...update, updatedAt: new Date() } }
      );
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(
    CollectionName.DATASET,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<DatasetDb>>(
    CollectionName.DATASET,
    async (collection) => {
      return collection.find(isUsersOrPublic(userId));
    }
  );

const Dataset = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find
};

export default Dataset;
