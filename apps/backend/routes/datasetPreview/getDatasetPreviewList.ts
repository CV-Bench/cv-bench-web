import { Request, Response } from "express";

import { AccessType, TaskStatus } from "shared-types";

import Database from "../../connectors/mongo";

const getDatasetPreviewList = (req: Request, res: Response) => {
  const taskId = req.params.id;

  Database.Task.findOne(taskId, undefined).then((result) => {
    if (!result) {
      res.status(200).json([]);
      return;
    }
    
    const { status, info, userId } = result;

    const isTaskFinished = [TaskStatus.FINISHED, TaskStatus.ABORTED].includes(
      status
    );
    const isUserRequesting = userId.toString() === req.session.user?._id;

    if (
      (!isTaskFinished && !isUserRequesting) ||
      (isTaskFinished &&
        info.accessType != AccessType.PUBLIC &&
        !isUserRequesting)
    ) {
      res.status(403).end();
      return;
    }

    Database.DatasetPreview.find(taskId).then((results) =>
      results.toArray().then((list) => res.status(200).json(list))
    );
  });
};

export default getDatasetPreviewList;
