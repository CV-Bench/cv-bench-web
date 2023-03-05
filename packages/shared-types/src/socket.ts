import { Socket } from "socket.io";

import { SessionUser } from "./auth";
import { TaskDb } from "./task";
import { DataType } from "./utils";

export enum SocketType {
  FRONTEND = "FRONTEND",
  SERVER = "SERVER"
}

export enum ServerNamespace {
  TASK = "TASK",
  DATA = "DATA"
}

export const ServerNamespaceMap: {
  [key: string | ServerNamespace]: ServerNamespace | string;
} = {
  [ServerNamespace.TASK]: "/task",
  [ServerNamespace.DATA]: "/data",
  "/task": ServerNamespace.TASK,
  "/data": ServerNamespace.DATA
};

export interface SocketDb {
  _id: string | any;
  createdAt: Date;
  socketId: string;
  type: SocketType;
  serverNamespace?: ServerNamespace;
  serverId?: string;
}

export interface ServerSocketData {
  serverId: string;
}

export interface TaskNamespaceData extends ServerSocketData {
  taskId: string;
}

export interface DataNamespaceData extends ServerSocketData {
  dataId: string;
  dataType: DataType;
}

export interface ClientToServerEvents {
  authorize: (token: string) => boolean;
}

export interface ServerToClientEvents {
  blocked: (retryMs: Number) => void;
}

// Data Namespace Events
export interface DataNamespaceClientToServerEvents
  extends ClientToServerEvents {
  upload_failed: (data: DataNamespaceData) => void;
  data_uploaded: (data: DataNamespaceData & { s3Key: string }) => void;
  data_deleted: (data: DataNamespaceData) => void;
}

export type DataNamespaceServerToClientEventFunction = (data: {
  dataId: string;
  dataType: DataType;
}) => void;

export interface DataNamespaceServerToClientEvents
  extends ServerToClientEvents {
  upload: DataNamespaceServerToClientEventFunction;
  delete: DataNamespaceServerToClientEventFunction;
}

export type TaskNamespaceClientToServerEventFunction = (
  data: TaskNamespaceData
) => void;

// Task Namespace Events
export interface TaskNamespaceClientToServerEvents
  extends ClientToServerEvents {
  start_failed: TaskNamespaceClientToServerEventFunction;
  task_started: TaskNamespaceClientToServerEventFunction;
  stop_failed: TaskNamespaceClientToServerEventFunction;
  task_stopped: TaskNamespaceClientToServerEventFunction;
  cleanup_failed: TaskNamespaceClientToServerEventFunction;
  task_cleaned: TaskNamespaceClientToServerEventFunction;
  task_log: (data: TaskDb) => void;
}

export interface TaskNamespaceServerToClientEvents
  extends ServerToClientEvents {
  start: (data: { taskId: string }) => void;
  stop: (data: { taskId: string }) => void;
  cleanup: (data: { taskId: string }) => void;
  task_viewer: (viewer: SessionUser) => void;
}

// Frontend Namespace Events
export interface FrontendNamespaceClientToServerEvents
  extends ClientToServerEvents {}

export interface FrontendNamespaceServerToClientEvents
  extends ServerToClientEvents {
  start_failed: (data: TaskNamespaceData) => void;
  task_started: (data: TaskNamespaceData) => void;
  stop_failed: (data: TaskNamespaceData) => void;
  task_stopped: (data: TaskNamespaceData) => void;
  task_log: (data: TaskDb) => void;
}
