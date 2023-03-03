import {
  Collection,
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import { AccessType, CollectionName, loggerTitle, ModelDb } from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const findOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<ModelDb>(CollectionName.MODEL, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...isUsersOrPublic(userId)
    });
  });

const insert = (model: Omit<ModelDb, "_id" | "updatedAt" | "createdAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.MODEL,
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
  userId: string | ObjectId,
  update: Partial<ModelDb>
) =>
  collectionRequest<UpdateResult>(CollectionName.MODEL, async (collection) => {
    return collection.updateOne(
      {
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      },
      {
        $set: {
          ...update,
          updatedAt: new Date()
        }
      }
    );
  });

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(CollectionName.MODEL, async (collection) => {
    return collection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    });
  });

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<ModelDb>>(
    CollectionName.MODEL,
    async (collection) => {
      return collection.find(isUsersOrPublic(userId));
    }
  );

const findByIds = (userId: string | ObjectId, ids: ObjectId[]) =>
  collectionRequest<FindCursor<ModelDb>>(
    CollectionName.MODEL,
    async (collection) => {
      return collection.find({
        $and: [
          {
            $or: [
              { userId: new ObjectId(userId) },
              { accessType: AccessType.PUBLIC }
            ]
          },
          {
            _id: {
              $in: ids
            }
          }
        ]
      });
    }
  );

const Model = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find,
  findByIds
};

export default Model;
