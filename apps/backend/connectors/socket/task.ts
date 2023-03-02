import { Namespace } from "socket.io";
import {Socket} from "./";

import {
  TaskNamespaceClientToServerEvents,
  TaskNamespaceData,
  TaskNamespaceServerToClientEvents
} from "shared-types";

import { redisClient } from "../redis";

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

  socket.on("task_log", receiveTaskLogData);
});

const receiveTaskLogData = (data: TaskNamespaceData) => {
  redisClient.set(`taskLog:${data.taskId}`, JSON.stringify(data));
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
