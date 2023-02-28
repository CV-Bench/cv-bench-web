import { Namespace } from "socket.io";
import { TaskNamespaceClientToServerEvents, TaskNamespaceData, TaskNamespaceServerToClientEvents } from "types";
import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";

const taskNamespace:Namespace<TaskNamespaceClientToServerEvents, TaskNamespaceServerToClientEvents> = io.of("/task");

taskNamespace.use(serverAuthMiddleware);
taskNamespace.use(serverRegistryMiddleware);

taskNamespace.on("connection", (socket) => {
  socket.on("start_failed", (data: TaskNamespaceData) => {});

  socket.on("task_started", (data: TaskNamespaceData) => {});

  socket.on("stop_failed", (data: TaskNamespaceData) => {});

  socket.on("task_stopped", (data: TaskNamespaceData) => {});
});

const startTask = (taskId: string) => {
  taskNamespace.emit("start", taskId);
};

const stopTask = (taskId: string) => taskNamespace.emit("stop", taskId);

const Task = {
  start: startTask,
  stop: stopTask,
};

export default Task;
