import { ObjectId } from "mongodb";

import { SessionUser } from "./auth";
import { NotificationDb } from "./notification";
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
  userId?: ObjectId;
}

export interface ServerSocketData {
  serverId: string;
}

export interface TaskNamespaceData extends ServerSocketData {
  taskId: string;
}

type StartPrevCurr = [number, number, number];

export interface TrainMetrics {
  iter: StartPrevCurr;
  lr: StartPrevCurr;
  memory: StartPrevCurr;
  data_time: StartPrevCurr;
  loss_rpn_cls: StartPrevCurr;
  loss_rpn_bbox: StartPrevCurr;
  loss_cls: StartPrevCurr;
  acc: StartPrevCurr;
  loss_bbox: StartPrevCurr;
  loss: StartPrevCurr;
  time: StartPrevCurr;
}

export type TrainMetricKeys = keyof TrainMetrics;

export interface ValidationMetrics {
  iter: StartPrevCurr;
  lr: StartPrevCurr;
  bbox_mAP: StartPrevCurr;
  bbox_mAP_50: StartPrevCurr;
  bbox_mAP_75: StartPrevCurr;
  bbox_mAP_s: StartPrevCurr;
  bbox_mAP_m: StartPrevCurr;
  bbox_mAP_l: StartPrevCurr;
}

export type ValidationMetricKeys = keyof ValidationMetrics;

export interface NetworkMetrics {
  train: TrainMetrics;
  val: ValidationMetrics;
  currentEpoch: number;
}

export interface TaskLogUpdateData extends TaskNamespaceData {
  timestamp: number;

  lines: string[];
  metrics?: NetworkMetrics;
}

export interface TaskLogUpdateDb extends TaskLogUpdateData {
  _id: string | ObjectId;
  updatedAt: Date;
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
  log_update: (data: TaskLogUpdateData) => void;
}

export interface TaskNamespaceServerToClientEvents
  extends ServerToClientEvents {
  start: (data: { taskId: string }) => void;
  stop: (data: { taskId: string }) => void;
  cleanup: (data: { taskId: string }) => void;
  task_viewer: (viewer: SessionUser) => void;
  subscribe_task_log: (data: { taskId: string; userId: string }) => void;
  unsubscribe_task_log: (data: { taskId: string; userId: string }) => void;
}

// Frontend Namespace Events
export interface FrontendNamespaceClientToServerEvents
  extends ClientToServerEvents {
  subscribe_task_log: (data: { taskId: string }) => void;
  unsubscribe_task_log: (data: { taskId: string }) => void;
}

export interface FrontendNamespaceServerToClientEvents
  extends ServerToClientEvents {
  task_log: (data: TaskLogUpdateData) => void;

  notification: (data: NotificationDb) => void;
}
