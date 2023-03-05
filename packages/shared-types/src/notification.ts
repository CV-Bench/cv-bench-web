import * as z from "zod";

import { DataType, ObjId } from "./utils";

export enum NotificationType {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING"
}

export const NotificationBody = z.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z.date(),
  updatedAt: z.date(),
  isRead: z.boolean(),
  description: z.string(),
  title: z.string(),
  href: z.string(),
  type: z.nativeEnum(NotificationType)
});

export type NotificationDb = z.infer<typeof NotificationBody>;

// PATCH NOTIFICATION
export const PatchNotificationBody = z.object({
  isRead: z.boolean()
});

export type PatchNotification = z.infer<typeof PatchNotificationBody>;

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

export enum NotificationTrigger {
  "TASK_FINISHED",
  "TASK_STOPPED",
  "TASK_STARTED",
  "DOWNLOAD_READY"
}

export interface BuildNotificationInfos {
  title: string;
  description: string;
  type: NotificationType;
  href: string;
}

export const buildNotificationInfos = (
  trigger: NotificationTrigger,
  name: string,
  id: string,
  options?: { dataType?: DataType }
): BuildNotificationInfos =>
  ({
    [NotificationTrigger.TASK_STARTED]: {
      title: "Task Started!",
      description: `Task with name ${name} started successfully.`,
      type: NotificationType.INFO,
      href: `/task/${id}`
    },
    [NotificationTrigger.TASK_STOPPED]: {
      title: "Task Stopped!",
      description: `Task with name ${name} has been stopped.`,
      type: NotificationType.WARNING,
      href: `/task/${id}`
    },
    [NotificationTrigger.TASK_FINISHED]: {
      title: "Task Finished!",
      description: `Task with name ${name} finished successfully.`,
      type: NotificationType.SUCCESS,
      href: `/task/${id}`
    },
    [NotificationTrigger.DOWNLOAD_READY]: {
      title: "Download Read!",
      description: `Download for file ${name} is ready!`,
      type: NotificationType.INFO,
      href: `/${
        options &&
        options.dataType &&
        { [DataType.DATASET]: "dataset", [DataType.NETWORK]: "network" }[
          options.dataType
        ] +
          "/" +
          id
      }/${id}`
    }
  }[trigger]);

export interface NotificationSocketMessage extends NotificationDb {}
