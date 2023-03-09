import { ObjectId } from "mongodb";
import { ExtendedError } from "socket.io/dist/namespace";

import {
  ServerNamespace,
  ServerNamespaceMap,
  SocketType,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";

import { FrontendSocket, SocketMiddleware, SocketWithUser } from "./types";

export const serverAuthMiddleware: SocketMiddleware = (socket, next) => {
  const token = socket.handshake.auth[process.env.SOCKET_AUTH_TOKEN_KEY || ""];

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
//   Database.Socket.findOne(
//     socket.handshake.headers.serverid as string,
//     ServerNamespaceMap[socket.nsp.name] as ServerNamespace
//   ).then((result) => {
//     if (result) {
//       Database.Socket.deleteOne(socket.id).then(() => {
//         next()
//       });
//     } else {
//       next();
//     }
//   }).catch(() => next());
  next();
};

export const serverRegistryMiddleware: SocketMiddleware = (socket, next) => {
  Database.Socket.insertOne({
    createdAt: new Date(),
    socketId: socket.id,
    type: SocketType.SERVER,
    serverNamespace: ServerNamespaceMap[socket.nsp.name] as ServerNamespace,
    serverId: socket.handshake.headers.serverid as string
  });

  logger.debug(
    loggerTitle.SOCKET,
    "New Server registrated",
    "ID: " + socket.handshake.headers.serverid
  );

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
