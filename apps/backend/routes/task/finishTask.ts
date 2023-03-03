import { Response } from "express";
import { ObjectId } from "mongodb";

import { FinishTask, TypedRequest, TaskType, TaskStatus } from "shared-types";

import Database from "../../connectors/mongo";

const finishTask = (req: TypedRequest<FinishTask>, res: Response) => {
  const userId = new ObjectId(req.session.user?._id);
  const { taskId } = req.body;

  Database.Task.findOne(taskId, userId)
    .then(
      (task) => {
        switch (task.type) {
          case TaskType.CREATE_DATASET:
            break;

          case TaskType.CREATE_NETWORK:
            break;
        }

        Database.Task.updateOne(taskId, userId, {
          status: TaskStatus.FINISHED
        });

        //TODO Dataset/Network aus Daten erstellen
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
