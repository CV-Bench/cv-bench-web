import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getTaskLog = (req: Request, res: Response) => {
  const taskId = req.params.id;

  Database.Task.findOne(taskId, req.session.user?._id)
    .then(() => {
      Database.TaskLog.findOne(taskId)
        .then((result) => res.status(200).json(result))
        .catch((e) => {
          console.error(e);
          res.status(404).end();
        });
    })
    .catch(() => res.status(404).end());
};

export default getTaskLog;
