import {
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import { CollectionName, BackgroundDb, AccessType } from "shared-types";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const findOne = (id: string | ObjectId, userId: string) =>
  collectionRequest<BackgroundDb>(
    CollectionName.BACKGROUND,
    async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id),
        ...isUsersOrPublic(userId)
      });
    }
  );

const insertOne = (background: Omit<BackgroundDb, "createdAt" | "updatedAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.BACKGROUND,
    async (collection) => {
      return collection.insertOne({
        ...background,
        updatedAt: new Date(),
        createdAt: new Date()
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId,
  update: Partial<BackgroundDb>
) =>
  collectionRequest<UpdateResult>(
    CollectionName.BACKGROUND,
    async (collection) => {
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
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(
    CollectionName.BACKGROUND,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<BackgroundDb>>(
    CollectionName.BACKGROUND,
    async (collection) => {
      return collection.find({
        $or: [
          { userId: new ObjectId(userId) },
          { accessType: AccessType.PUBLIC }
        ]
      });
    }
  );

const findByTags = (userId: string | ObjectId, domainTags: string[]) =>
  collectionRequest<FindCursor<BackgroundDb>>(
    CollectionName.BACKGROUND,
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
            $or: [
              {
                domainTags: {
                  $in: domainTags
                }
              },
              {
                domainTags: domainTags
              }
            ]
          }
        ]
      });
    }
  );

const findByIds = (userId: string | ObjectId, ids: ObjectId[]) =>
  collectionRequest<FindCursor<BackgroundDb>>(
    CollectionName.BACKGROUND,
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

const Background = {
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  find,
  findByTags,
  findByIds
};

export default Background;
