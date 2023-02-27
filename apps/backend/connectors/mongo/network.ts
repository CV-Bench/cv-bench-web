import {
  Collection,
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult,
} from "mongodb";
import { AccessType, CollectionName, NetworkDb, loggerTitle } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";
import { isUsersOrPublic } from "./utils";

prepareCollection(CollectionName.NETWORK).then((collection) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Collection Ready: ${collection.namespace}`
  );
});

const findOne = (id: string | ObjectId, userId: string) =>
  collectionRequest<NetworkDb>(CollectionName.NETWORK, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...isUsersOrPublic(userId),
    });
  });

const insert = (model: Omit<NetworkDb, "_id" | "createdAt" | "updatedAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.insertOne({
        ...model,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId,
  update: Partial<NetworkDb>
) =>
  collectionRequest<UpdateResult>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id),
          userId: new ObjectId(userId),
        },
        {
          $set: {
            ...update,
            updatedAt: new Date(),
          },
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
        userId: new ObjectId(userId),
      });
    }
  );

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<NetworkDb>>(
    CollectionName.NETWORK,
    async (collection) => {
      return collection.findOne({
        $or: [
          { userId: new ObjectId(userId) },
          { accessType: AccessType.PUBLIC },
        ],
      });
    }
  );

const Network = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find,
};

export default Network;
