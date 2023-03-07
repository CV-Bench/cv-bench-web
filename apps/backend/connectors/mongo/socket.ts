import { FindCursor, InsertOneResult, ObjectId } from "mongodb";

import {
  CollectionName,
  ModelDb,
  ServerNamespace,
  SocketDb,
  SocketType
} from "shared-types";

import { collectionRequest } from "./";

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

const findOne = (serverId: string, namespace: ServerNamespace) =>
  collectionRequest<SocketDb>(CollectionName.SOCKET, async (collection) => {
    return collection.findOne({
      serverId,
      serverNamespace: namespace
    });
  });

const findUserSockets = (userId: ObjectId | string) =>
  collectionRequest<FindCursor<SocketDb>>(
    CollectionName.SOCKET,
    async (collection) => {
      return collection.find({
        userId: new ObjectId(userId)
      });
    }
  );

const findServerSockets = (namespace: ServerNamespace) =>
  collectionRequest<FindCursor<SocketDb>>(
    CollectionName.SOCKET,
    async (collection) => {
      return collection.find({
        type: SocketType.SERVER,
        serverNamespace: namespace
      });
    }
  );

const Socket = {
  insertOne,
  deleteOne,
  findOne,
  findUserSockets,
  findServerSockets
};

export default Socket;
