import { Namespace } from "socket.io";

import {
  NotificationTrigger,
  ServerNamespace,
  TaskLogUpdateData,
  TaskNamespaceClientToServerEvents,
  TaskNamespaceData,
  TaskNamespaceServerToClientEvents,
  TaskStatus,
  TaskType,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";
import Database from "../mongo";
import Notification from "../notifications";

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

  socket.on("log_update", (data: TaskLogUpdateData) => {
    logger.debug(loggerTitle.SOCKET, "Received log update.");

    Database.TaskLog.upsertOne(data.taskId, data);
  });

  socket.on("cleanup_failed", (data: TaskNamespaceData) => {});

  socket.on("task_cleaned", (data: TaskNamespaceData) => {});
});

const startTask = (taskId: string) => {
  // Find all Servers
  const databaseRequests = [];

  databaseRequests.push(
    Database.Task.countServerTasks().then((result) => result.toArray())
  );

  databaseRequests.push(
    Database.Socket.findServerSockets(ServerNamespace.TASK).then((result) =>
      result.toArray()
    )
  );

  Promise.all(databaseRequests).then(([taskCounter, connectedSockets]) => {});

  taskNamespace.emit("start", { taskId });
};

const stopTask = (taskId: string) => taskNamespace.emit("stop", { taskId });

const cleanupTask = (taskId: string) =>
  taskNamespace.emit("cleanup", { taskId });

const setSubscribeTaskLog = (
  rcvId: string,
  data: { taskId: string; userId: string; taskType: TaskType },
  event: "subscribe_task_log" | "unsubscribe_task_log"
) => {
  const serverSocket = taskNamespace.sockets.get(rcvId);

  if (!serverSocket) {
    return;
  }

  serverSocket.emit(event, data);
};

const Task = {
  start: startTask,
  stop: stopTask,
  cleanup: cleanupTask,
  toggleSubscribe: setSubscribeTaskLog
};

export default Task;
