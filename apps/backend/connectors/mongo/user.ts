import { Collection, DeleteResult, FindCursor, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import {
  AccessType,
  CollectionName,
  loggerTitle,
  SessionUser,
} from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";

prepareCollection(CollectionName.USER).then((collection) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Collection Ready: ${collection.namespace}`
  );
});

const findOne = (id: string | ObjectId) =>
  collectionRequest<SessionUser>(CollectionName.USER, async (collection) => {
    return collection.findOne({
      id: id,
    });
  });

const insert = (user: SessionUser) =>
  collectionRequest<InsertOneResult>(
    CollectionName.USER,
    async (collection) => {
      return collection.insertOne(user);
    }
  );

const updateOne = (id: string | ObjectId, update: Partial<SessionUser>) =>
  collectionRequest<UpdateResult>(CollectionName.USER, async (collection) => {
    return collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: update }
    );
  });

const deleteOne = (id: string | ObjectId) =>
  collectionRequest<DeleteResult>(CollectionName.USER, async (collection) => {
    return collection.deleteOne({
      _id: new ObjectId(id),
    });
  });

const User = {
  findOne,
  insert,
  updateOne,
  deleteOne,
};

export default User;
