import {
  Collection,
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import {
  AccessType,
  CollectionName,
  NetworkDb,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const findOne = (id: string | ObjectId, userId: string | undefined) =>
  collectionRequest<NetworkDb>(CollectionName.NETWORK, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...(userId ? isUsersOrPublic(userId) : {})
    });
  });

const insert = (model: Omit<NetworkDb, "_id" | "createdAt" | "updatedAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.insertOne({
        ...model,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId | undefined,
  update: Partial<NetworkDb>
) =>
  collectionRequest<UpdateResult>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id),
          ...(userId ? { userId: new ObjectId(userId) } : {})
        },
        {
          $set: {
            ...update,
            updatedAt: new Date()
          }
        }
      );
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<NetworkDb>>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.find(isUsersOrPublic(userId));
    }
  );

const Network = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find
};

export default Network;
