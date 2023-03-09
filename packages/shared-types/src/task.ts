import * as z from "zod";

import { AccessType, ObjId } from "./utils";

export enum TaskStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  ABORTED = "ABORTED",
  FINISHED = "FINISHED"
}

export enum TaskType {
  CREATE_NETWORK = "CREATE_NETWORK",
  CREATE_DATASET = "CREATE_DATASET"
}

export const TaskInfoBase = z.object({
  name: z.string(),
  description: z.string().optional(),
  accessType: z.nativeEnum(AccessType),
  domainTags: z.array(z.string())
});

export const TaskDatasetInfoBody = TaskInfoBase.extend({
  modelIds: z.array(ObjId),
  distractorIds: z.array(ObjId),
  backgroundIds: z.array(ObjId),
  configurationId: ObjId
});

export const TaskNetworkInfoBody = TaskInfoBase.extend({
  datasetId: ObjId,
  networkArchitectureId: ObjId
});

export type TaskDatasetInfo = z.infer<typeof TaskDatasetInfoBody>;
export type TaskNetworkInfo = z.infer<typeof TaskNetworkInfoBody>;

export const TaskBody = z.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  serverId: z.string().optional(),
  status: z.nativeEnum(TaskStatus),
  type: z.nativeEnum(TaskType),
  info: TaskDatasetInfoBody.or(TaskNetworkInfoBody)
});

export type TaskDb = z.infer<typeof TaskBody>;

export const GetTaskBody = TaskBody.omit({
  createdAt: true,
  updatedAt: true
}).extend({
  createdAt: z.string().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d))
});

export type GetTask = z.infer<typeof GetTaskBody>;

export const GetTaskListBody = z.array(GetTaskBody.omit({ info: true }));

export type GetTaskList = z.infer<typeof GetTaskListBody>;

// FINISH TASK
export const FinishTaskBody = z.object({ taskId: z.string() });

export type FinishTask = z.infer<typeof FinishTaskBody>;

// STOP TASK
export const StopTaskBody = z.object({ taskId: z.string() });

export type StopTask = z.infer<typeof StopTaskBody>;

// SUBSCRIBE TASK LOG
export const TaskLogTriggerBody = z.object({
  taskId: z.string()
});

export type TaskLogTrigger = z.infer<typeof TaskLogTriggerBody>;
