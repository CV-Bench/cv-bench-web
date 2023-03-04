import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getTaskList = (req: Request, res: Response) => {
    Database.Task.find(req.session.user?._id)
      .then((result) =>
        result.toArray().then((tasks) => res.status(200).json(tasks))
      )
      .catch((e) => {
        console.error(e);
        res.status(500).end();
      });
  };

export default getTaskList;
