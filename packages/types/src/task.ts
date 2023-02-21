import * as z from "zod";
import { ObjId } from "./utils";

export enum TaskStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  ABORTED = "ABORTED",
  FINISHED = "FINISHED",
}

export enum TaskType {
  CREATE_NETWORK = "CREATE_NETWORK",
  CREATE_DATASET = "CREATE_DATASET",
}

export const TaskBody = z.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(TaskStatus),
  type: z.nativeEnum(TaskType),
  info: z.object({
    modelId: ObjId.optional(),
    datasetId: ObjId.optional(),
    networkArchitectureId: ObjId.optional(),
  }),
});

export type TaskDb = z.infer<typeof TaskBody>;

export const PostTaskBody = TaskBody.pick({
  type: true,
  info: true,
});

export type PostTask = z.infer<typeof PostTaskBody>;
