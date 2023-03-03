import * as z from "zod";

import { ObjId } from "./utils";

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

export const TaskBody = z.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(TaskStatus),
  type: z.nativeEnum(TaskType),
  info: z
    .object({
      modelId: z.array(ObjId),
      backgrounds: z.array(ObjId),
      datasetConfigurationId: ObjId
    })
    .or(
      z.object({
        datasetId: ObjId,
        networkArchitectureId: ObjId
      })
    )
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
