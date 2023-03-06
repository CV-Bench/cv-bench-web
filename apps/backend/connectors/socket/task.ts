import { Namespace, Socket as SocketIO } from "socket.io";

import {
  NotificationTrigger,
  TaskDb,
  TaskNamespaceClientToServerEvents,
  TaskNamespaceData,
  TaskNamespaceServerToClientEvents,
  TaskStatus
} from "shared-types";

import Database from "../mongo";
import Notification from "../notifications";
import { redisClient } from "../redis";

import { Socket } from "./";
import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";

const taskNamespace: Namespace<
  TaskNamespaceClientToServerEvents,
  TaskNamespaceServerToClientEvents
> = io.of("/task");

taskNamespace.use(serverAuthMiddleware);
taskNamespace.use(serverRegistryMiddleware);

taskNamespace.on("connection", (socket) => {
  socket.on("start_failed", (data: TaskNamespaceData) => {
    // TODO Try different Server
  });

  socket.on("task_started", ({ taskId, serverId }: TaskNamespaceData) => {
    Database.Task.updateOne(taskId, undefined, {
      serverId,
      status: TaskStatus.RUNNING
    }).then(() =>
      Notification.add(NotificationTrigger.TASK_STARTED, taskId, {})
    );
  });

  socket.on("stop_failed", (data: TaskNamespaceData) => {});

  socket.on("task_stopped", ({ taskId }: TaskNamespaceData) => {
    Database.Task.updateOne(taskId, undefined, {
      status: TaskStatus.ABORTED
    }).then(() =>
      Notification.add(NotificationTrigger.TASK_STOPPED, taskId, {})
    );
  });

  socket.on("task_log", (data) => {
    receiveTaskLogData(data, socket);
  });

  socket.on("cleanup_failed", (data: TaskNamespaceData) => {});

  socket.on("task_cleaned", (data: TaskNamespaceData) => {});
});

const receiveTaskLogData = (data: TaskDb, socket: SocketIO) => {
  redisClient.set(`taskLog:${data._id}`, JSON.stringify(data));
  Socket.Frontend.Sockets.forEach((frontendSocket) => {
    //@ts-ignore
    if (frontendSocket.user._id == data.userId) {
      frontendSocket.emit("task_log", data);
      //@ts-ignore
      socket.emit("task_viewer", frontendSocket.user);
      return;
    }
  });
};

const startTask = (taskId: string) => {
  taskNamespace.emit("start", { taskId });
};

const stopTask = (taskId: string) => taskNamespace.emit("stop", { taskId });

const getTask = async (taskId: string) => {};
const cleanupTask = (taskId: string) =>
  taskNamespace.emit("cleanup", { taskId });

const Task = {
  start: startTask,
  stop: stopTask,
  get: getTask,
  cleanup: cleanupTask
};

export default Task;
