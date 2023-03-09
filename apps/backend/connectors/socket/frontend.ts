import { ObjectId } from "mongodb";
import { Namespace } from "socket.io";
import * as socketJwt from "socketio-jwt";
import * as util from "util";

import {
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents,
  NotificationDb,
  loggerTitle,
  ServerNamespace,
  TaskLogUpdateData
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";

import { Socket } from "./";
import io from "./client";
import { userRegistryMiddleware } from "./middleware";
import { FrontendSocket, SocketWithUser } from "./types";

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
  logger.info(loggerTitle.SOCKET, "/frontend | Socket connected:", socket.id);
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
    handleTaskSubscription(tmp, socket as SocketWithUser, "subscribe_task_log");
  });
  socket.on("unsubscribe_task_log", (tmp) => {
    handleTaskSubscription(
      tmp,
      socket as SocketWithUser,
      "unsubscribe_task_log"
    );
  });
});

const handleTaskSubscription = (
  { taskId }: { taskId: string },
  socket: SocketWithUser,
  event: "subscribe_task_log" | "unsubscribe_task_log"
) => {
  console.log("SUBSCRIBE TO TASK");

  Database.Task.findOne(taskId, socket?.user?._id).then((task) => {
    if (!task) {
      return;
    }

    console.log(task.serverId);

    Database.Socket.findOne(task.serverId as string, ServerNamespace.TASK).then(
      (res) => {
        if (!res) {
          return;
        }

        console.log(res.socketId);

        Socket.Task.toggleSubscribe(
          res.socketId,
          {
            taskId: taskId,
            userId: socket?.user?._id,
            taskType: task.type
          },
          event
        );
      }
    );
  });
};

const mapUserSockets = (
  userId: string | ObjectId,
  callback: (socket: FrontendSocket) => any
) => {
  Database.Socket.findUserSockets(userId).then((result) =>
    result.toArray().then((result) => {
      for (const { socketId } of result) {
        const socket = frontendNamespace.sockets.get(socketId);

        if (!socket) {
          Database.Socket.deleteOne(socketId);
          continue;
        }

        callback(socket);
      }
    })
  );
};

const sendNotification = (
  notification: NotificationDb,
  userId: string | ObjectId
) =>
  mapUserSockets(userId, (socket) => socket.emit("notification", notification));

const sendLogUpdate = (data: TaskLogUpdateData) => {
  const { taskId } = data;

  Database.Task.findOne(taskId, undefined)
    .then(({ userId }) => {
      mapUserSockets(userId, (socket) => socket.emit("task_log", data));
    })
    .catch(() => {});
};

const Frontend = {
  Sockets: frontendNamespace.sockets,
  sendNotification,
  sendLogUpdate
};

export default Frontend;
