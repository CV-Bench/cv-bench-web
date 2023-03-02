import { Socket } from "socket.io";

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
  socketId: string;
}

export interface TaskNamespaceData extends ServerSocketData {
  taskId: string;
}

export interface DataNamespaceData {
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
  extends ClientToServerEvents {}

export interface DataNamespaceServerToClientEvents
  extends ServerToClientEvents {
  upload: (dataId: string, dataType: DataType) => void;
  delete: (dataId: string, dataType: DataType) => void;
}

// Task Namespace Events
export interface TaskNamespaceClientToServerEvents
  extends ClientToServerEvents {
  start_failed: (data: TaskNamespaceData) => void;
  task_started: (data: TaskNamespaceData) => void;
  stop_failed: (data: TaskNamespaceData) => void;
  task_stopped: (data: TaskNamespaceData) => void;
  task_log: (data: TaskNamespaceData) => void;
}

export interface TaskNamespaceServerToClientEvents
  extends ServerToClientEvents {
  start: (taskId: string) => void;
  stop: (taskId: string) => void;
}
