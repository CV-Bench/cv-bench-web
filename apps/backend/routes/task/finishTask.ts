import { Response } from "express";
import { ObjectId } from "mongodb";

import {
  FinishTask,
  TypedRequest,
  TaskType,
  TaskStatus,
  TaskDatasetInfo,
  DatasetType,
  NotificationTrigger
} from "shared-types";

import Database from "../../connectors/mongo";
import Notification from "../../connectors/notifications";
import { Socket } from "../../connectors/socket";

const finishTask = (req: TypedRequest<FinishTask>, res: Response) => {
  const { taskId } = req.body;

  Database.Task.findOne(taskId, undefined)
    .then(
      (task) => {
        let insertPromise;

        switch (task.type) {
          case TaskType.CREATE_DATASET:
            insertPromise = Database.Dataset.insert({
              ...(task.info as TaskDatasetInfo),
              size: 0,
              images: 0,
              datasetType: DatasetType.BLENDER_3D,
              userId: new ObjectId(task.userId),
              _id: new ObjectId(taskId)
            });
            break;
          case TaskType.CREATE_NETWORK:
            insertPromise = Database.Network.insert({
              ...task.info,
              _id: new ObjectId(taskId)
            });
            break;
        }

        if (!insertPromise) {
          res.status(500).end();

          return;
        }

        insertPromise.catch((e) => console.error(e));

        Socket.Task.cleanup(taskId);

        Database.Task.updateOne(taskId, task.userId, {
          status: TaskStatus.FINISHED
        }).then(() =>
          Notification.add(NotificationTrigger.TASK_FINISHED, taskId, {})
        );
      },
      () => {
        res.status(404).end();
      }
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default finishTask;
