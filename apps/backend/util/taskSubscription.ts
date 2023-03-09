import { ServerNamespace } from "shared-types";

import Database from "../connectors/mongo";
import { Socket } from "../connectors/socket";

export const handleTaskSubscription = async (
  { taskId, userId }: { taskId: string; userId: string },
  event: "subscribe_task_log" | "unsubscribe_task_log"
) => {
  return Database.Task.findOne(taskId, userId).then((task) => {
    if (!task) {
      return;
    }

    Database.Socket.findOne(task.serverId as string, ServerNamespace.TASK).then(
      (res) => {
        if (!res) {
          return;
        }

        console.log(res.socketId);

        Socket.Task.toggleSubscribe(
          res.socketId,
          {
            taskId,
            userId,
            taskType: task.type
          },
          event
        );
      }
    );
  });
};
