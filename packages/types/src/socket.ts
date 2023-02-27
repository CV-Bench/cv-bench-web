import { DataType } from "./utils";

export enum SocketType {
  FRONTEND = "FRONTEND",
  SERVER = "SERVER",
}

export enum ServerNamespace {
  TASK = "TASK",
  DATA = "DATA",
}

export const ServerNamespaceMap: {
  [key: string | ServerNamespace]: ServerNamespace | string;
} = {
  [ServerNamespace.TASK]: "/task",
  [ServerNamespace.DATA]: "/data",
  "/task": ServerNamespace.TASK,
  "/data": ServerNamespace.DATA,
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
