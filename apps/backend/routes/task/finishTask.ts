import { Response } from "express";
import { ObjectId } from "mongodb";

import {
  FinishTask,
  TypedRequest,
  TaskType,
  TaskStatus,
  TaskDatasetInfo,
  DatasetType
} from "shared-types";

import Database from "../../connectors/mongo";
import { Socket } from "../../connectors/socket";

const finishTask = (req: TypedRequest<FinishTask>, res: Response) => {
  const userId = req.session.user?._id;
  const { taskId } = req.body;

  Database.Task.findOne(taskId, userId)
    .then(
      (task) => {
        switch (task.type) {
          case TaskType.CREATE_DATASET:
            Database.Dataset.insert({
              ...(task.info as TaskDatasetInfo),
              size: 0,
              images: 0,
              datasetType: DatasetType.BLENDER_3D,
              userId: new ObjectId(task.userId)
            });
            break;
          case TaskType.CREATE_NETWORK:
            Database.Network.insert({
              ...task.info
            });
            break;
        }

        Database.Task.updateOne(taskId, userId, {
          status: TaskStatus.FINISHED
        });

        Socket.Task.cleanup(taskId);
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
