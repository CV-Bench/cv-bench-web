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


// GET SINGLE NOTIFICATION
export const GetNotificationBody = NotificationBody.omit({
  createdAt: true,
  updatedAt: true
}).extend({
  createdAt: z.string().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d))
});
export type GetNotification = z.infer<typeof GetNotificationBody>;

// GET NOTIFICATIONS
export const GetNotificationListBody = z.array(GetNotificationBody);
export type GetNotificationList = z.infer<typeof GetNotificationListBody>;
