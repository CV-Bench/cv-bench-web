import {
    Collection,
    DeleteResult,
    FindCursor,
    InsertOneResult,
    ObjectId,
    UpdateResult
  } from "mongodb";
  
  import { AccessType, CollectionName, loggerTitle, NotificationDb } from "types";
  
  import logger from "../../util/logger";
  
  import { collectionRequest, prepareCollection } from "./";
  import { isUsersOrPublic } from "./utils";
  
  prepareCollection(CollectionName.NOTIFICATION).then((collection) => {
    logger.debug(
      loggerTitle.MONGO_CLIENT,
      `Collection Ready: ${collection.namespace}`
    );
  });
  
  const findOne = (id: string | ObjectId, userId: string | ObjectId) =>
    collectionRequest<NotificationDb>(CollectionName.NOTIFICATION, async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id),
        ...isUsersOrPublic(userId)
      });
    });
  
  const insert = (notification: Omit<NotificationDb, "_id" | "updatedAt" | "createdAt">) =>
    collectionRequest<InsertOneResult>(
      CollectionName.NOTIFICATION,
      async (collection) => {
        return collection.insertOne({
          ...notification,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    );
  
  const updateOne = (
    id: string | ObjectId,
    userId: string | ObjectId,
    update: Partial<NotificationDb>
  ) =>
    collectionRequest<UpdateResult>(CollectionName.NOTIFICATION, async (collection) => {
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
    collectionRequest<DeleteResult>(CollectionName.NOTIFICATION, async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
      });
    });
  
  const find = (userId: string | ObjectId) =>
    collectionRequest<FindCursor<NotificationDb>>(
      CollectionName.NOTIFICATION,
      async (collection) => {
        return collection.find(isUsersOrPublic(userId));
      }
    );
  
  const Notification = {
    findOne,
    insert,
    updateOne,
    deleteOne,
    find
  };
  
  export default Notification;
  