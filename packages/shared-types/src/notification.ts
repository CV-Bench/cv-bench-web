import * as z from "zod";

import { ObjId } from "./utils";

export enum NotificationType {}

export const NotificationBody = z.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z.date(),
  updatedAt: z.date(),
  isRead: z.boolean(),
  description: z.string(),
  title: z.string(),
  type: z.nativeEnum(NotificationType)
});

export type NotificationDb = z.infer<typeof NotificationBody>;
