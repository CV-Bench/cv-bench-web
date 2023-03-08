import { ObjectId } from "mongodb";
import { Namespace, Socket as SocketIO } from "socket.io";
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
  loggerTitle,
  ServerNamespace
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";

import { Socket } from "./";
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

  socket.on("subscribe_task_log", (tmp) => {
    //@ts-ignore for user prop
    handleTaskSubscription(tmp, socket, "subscribe_task_log");
  });
  socket.on("unsubscribe_task_log", (tmp) => {
    //@ts-ignore for user prop
    handleTaskSubscription(tmp, socket, "unsubscribe_task_log");
  });
});

const handleTaskSubscription = (
  { taskId }: { taskId: string },
  socket: SocketIO<
    FrontendNamespaceClientToServerEvents,
    FrontendNamespaceServerToClientEvents
  > & {
    user: { _id: string; [key: string]: any };
  },
  event: "subscribe_task_log" | "unsubscribe_task_log"
) => {
  Database.Task.findOne(taskId, socket?.user?._id).then((task) => {
    if (!task) return;

    Database.Socket.findOne(task.serverId as string, ServerNamespace.TASK).then(
      (res) => {
        if (!res) return;

        const serverSocket = Socket.Task.sockets.get(res.socketId);
        serverSocket?.emit(event, {
          taskId: taskId,
          userId: socket?.user?._id
        });
      }
    );
  });
};

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
