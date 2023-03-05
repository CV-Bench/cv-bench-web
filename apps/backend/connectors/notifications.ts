import {
  DataType,
  NotificationTrigger,
  buildNotificationInfos
} from "shared-types";

import Database, { dataTypeCollectionMap } from "./mongo";
import { Socket } from "./socket";

const getDbObject = (
  trigger: NotificationTrigger,
  id: string,
  options: { dataType?: DataType }
) => {
  switch (trigger) {
    case NotificationTrigger.TASK_FINISHED:
    case NotificationTrigger.TASK_STOPPED:
    case NotificationTrigger.TASK_STARTED:
      return Database.Task.findOne(id, undefined);
    case NotificationTrigger.DOWNLOAD_READY:
      return Database[
        dataTypeCollectionMap(options.dataType as DataType)
      ].findOne(id, undefined);
  }
};

const add = (
  trigger: NotificationTrigger,
  id: string,
  options: { dataType?: DataType }
) => {
  getDbObject(trigger, id, options)
    .then(({ name, userId }) => {
      const notificationInfos = buildNotificationInfos(
        trigger,
        name,
        id,
        options
      );

      Database.Notification.insertOne({
        userId,
        ...notificationInfos
      }).then(({ insertedId }) => {
        Socket.Frontend.sendNotification(
          {
            ...notificationInfos,
            _id: insertedId,
            userId,
            isRead: false,
            updatedAt: new Date(),
            createdAt: new Date()
          },
          userId
        );
      });
    })
    .catch((e) => console.error(e));
};

const Notification = {
  add
};

export default Notification;
