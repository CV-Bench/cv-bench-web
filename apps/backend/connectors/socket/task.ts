import { Namespace, Socket as SocketIO } from "socket.io";

import {
  TaskDb,
  TaskNamespaceClientToServerEvents,
  TaskNamespaceData,
  TaskNamespaceServerToClientEvents
} from "shared-types";

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
  socket.on("start_failed", (data: TaskNamespaceData) => {});

  socket.on("task_started", (data: TaskNamespaceData) => {});

  socket.on("stop_failed", (data: TaskNamespaceData) => {});

  socket.on("task_stopped", (data: TaskNamespaceData) => {});

  socket.on("task_log", (data) => {
    receiveTaskLogData(data, socket);
  });
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
  taskNamespace.emit("start", taskId);
};

const stopTask = (taskId: string) => taskNamespace.emit("stop", taskId);

const getTask = async (taskId: string) => {};

const Task = {
  start: startTask,
  stop: stopTask,
  get: getTask
};

export default Task;
