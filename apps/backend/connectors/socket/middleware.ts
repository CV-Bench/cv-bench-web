import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import {
  ServerNamespace,
  ServerNamespaceMap,
  SocketType,
  loggerTitle,
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";
import { RedisStore } from "../redis";
import { redisClient } from "../redis";

import { FrontendSocket, SocketMiddleware, SocketWithUser } from "./types";

export const serverAuthMiddleware: SocketMiddleware = (socket, next) => {
  const token = socket.handshake.auth[process.env.SOCKET_AUTH_TOKEN_KEY || ""];

  console.log(socket.id);

  if (token != process.env.SOCKET_AUTH_TOKEN) {
    logger.error(
      loggerTitle.SOCKET,
      "Socket Connection failed.",
      "Failed to pass authentication!"
    );

    socket.disconnect();
    return;
  }

  if (
    !socket.handshake.headers.serverid ||
    !ServerNamespaceMap[socket.nsp.name]
  ) {
    logger.error(
      loggerTitle.SOCKET,
      "Socket Connection failed.",
      "Namespace not valid or id missing!"
    );

    socket.disconnect();
    return;
  }

  // If a server with this Id and Namespace is already connected
  Database.Socket.findOne(
    socket.handshake.headers.serverid as string,
    ServerNamespaceMap[socket.nsp.name] as ServerNamespace
  ).then((result) => {
    console.log(
      socket.handshake.headers.serverid,
      ServerNamespaceMap[socket.nsp.name],
      result
    );

    if (result) {
      socket.disconnect();
      logger.error(
        loggerTitle.SOCKET,
        "Socket Connection failed.",
        "Socket with this id and namespace already connected!"
      );

      return;
    }

    next();
  });
};

export const serverRegistryMiddleware: SocketMiddleware = (socket, next) => {
  Database.Socket.insertOne({
    createdAt: new Date(),
    socketId: socket.id,
    type: SocketType.SERVER,
    serverNamespace: ServerNamespaceMap[socket.nsp.name] as ServerNamespace,
    serverId: socket.handshake.headers.serverid as string
  });

  socket.on("disconnect", (reason) => {
    Database.Socket.deleteOne(socket.id);
  });

  next();
};

export const userRegistryMiddleware = (
  socket: FrontendSocket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const socketWithUser = socket as SocketWithUser;

  if (!socketWithUser.user || !socketWithUser.user._id) {
    logger.error(
      loggerTitle.SOCKET,
      "Socket Connection failed.",
      "Namespace not valid or id missing!"
    );

    socketWithUser.disconnect();
    return;
  }

  Database.Socket.insertOne({
    createdAt: new Date(),
    socketId: socketWithUser.id,
    type: SocketType.FRONTEND,
    userId: new ObjectId(socketWithUser.user._id)
  });

  socketWithUser.on("disconnect", (reason) => {
    Database.Socket.deleteOne(socketWithUser.id);
  });

  next();
};
