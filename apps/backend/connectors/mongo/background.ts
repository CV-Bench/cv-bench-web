import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { AccessType, CollectionName, BackgroundDb, loggerTitle } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";
import { isUsersOrPublic } from "./utils";

prepareCollection(CollectionName.BACKGROUNDS).then((collection) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Collection Ready: ${collection.namespace}`
  );
});

const findOne = (id: string | ObjectId, userId: string) =>
  collectionRequest<BackgroundDb>(
    CollectionName.BACKGROUNDS,
    async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id),
        ...isUsersOrPublic(userId),
      });
    }
  );

const insert = (model: Omit<BackgroundDb, "_id">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.BACKGROUNDS,
    async (collection) => {
      return collection.insertOne(model);
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId,
  update: Partial<BackgroundDb>
) =>
  collectionRequest<BackgroundDb>(
    CollectionName.BACKGROUNDS,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id),
          userId: new ObjectId(userId),
        },
        { $set: update }
      );
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<BackgroundDb>(
    CollectionName.BACKGROUNDS,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId),
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<BackgroundDb>(
    CollectionName.BACKGROUNDS,
    async (collection) => {
      return collection.findOne({
        $or: [
          { userId: new ObjectId(userId) },
          { accessType: AccessType.PUBLIC },
        ],
      });
    }
  );

const Background = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find,
};

export default Background;
