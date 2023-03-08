import { ObjectId } from "mongodb";
import { Namespace } from "socket.io";
import * as socketJwt from "socketio-jwt";
import * as util from "util";

import {
  DataNamespaceClientToServerEvents,
  DataNamespaceData,
  DataNamespaceServerToClientEvents,
  DataType,
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents,
  NotificationDb,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";

import io from "./client";
import { userRegistryMiddleware } from "./middleware";

const frontendNamespace: Namespace<
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents
> = io.of("/frontend");

frontendNamespace.use(
  socketJwt.authorize({
    secret: process.env.SOCKET_SESSION_SECRET!,
    handshake: true,
    callback: false,
    decodedPropertyName: "user"
  })
);

//@ts-ignore for user prop
frontendNamespace.use(userRegistryMiddleware);

io.engine.on("connection_error", (e) => {
  logger.error(
    loggerTitle.SOCKET,
    "Frontend Namespace",
    util.inspect(e.req),
    e.code,
    e.message,
    util.inspect(e.context)
  );
});

frontendNamespace.on("connection", (socket) => {
  logger.debug(loggerTitle.SOCKET, "/frontend | Socket connected:", socket.id);
  socket.onAny(async (event, ...args) => {
    try {
      socket.emit(event, args);
    } catch (rejRes: any) {
      // no available points to consume
      // emit error or warning message
      socket.emit("blocked", rejRes.msBeforeNext);
    }
  });
});

const sendNotification = (
  notification: NotificationDb,
  userId: string | ObjectId
) => {
  Database.Socket.findUserSockets(userId).then((result) =>
    result.toArray().then((result) => {
      for (const { socketId } of result) {
        const socket = frontendNamespace.sockets.get(socketId);

        if (!socket) {
          Database.Socket.deleteOne(socketId);
          continue;
        }

        socket.emit("notification", notification);
      }
    })
  );
};

const Frontend = {
  Sockets: frontendNamespace.sockets,
  sendNotification: sendNotification
};

export default Frontend;
