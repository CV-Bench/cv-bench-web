import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getTask = (req: Request, res: Response) => {
  Database.Task.findOne(req.params.id, req.session.user?._id)
    .then(
      (task) => {
        res.status(200).json(task).send();
      },
      () => {
        res.status(404).end();
      }
    )
    .catch(() => {
      res.status(500).end();
    });
};

export default getTask;
