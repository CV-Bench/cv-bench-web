import { Collection, FindCursor, InsertOneResult, ObjectId } from "mongodb";

import {
  AccessType,
  CollectionName,
  loggerTitle,
  ModelDb,
  ServerNamespace,
  SocketDb
} from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const insertOne = (model: Omit<SocketDb, "_id">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.SOCKET,
    async (collection) => {
      return collection.insertOne(model);
    }
  );

const deleteOne = (socketId: string) =>
  collectionRequest<ModelDb>(CollectionName.SOCKET, async (collection) => {
    return collection.deleteOne({
      socketId
    });
  });

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<ModelDb>>(
    CollectionName.SOCKET,
    async (collection) => {
      return collection.find({
        $or: [
          { userId: new ObjectId(userId) },
          { accessType: AccessType.PUBLIC }
        ]
      });
    }
  );

const findOne = (serverId: string, namespace: ServerNamespace) =>
  collectionRequest<SocketDb>(CollectionName.SOCKET, async (collection) => {
    return collection.findOne({
      serverId,
      serverNamespace: namespace
    });
  });

const Socket = {
  insertOne,
  deleteOne,
  find,
  findOne
};

export default Socket;
