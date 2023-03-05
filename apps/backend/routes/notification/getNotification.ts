import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Database from "../../connectors/mongo";

const getNotification = async (req: Request, res: Response) => {
  Database.Notification.findOne(req.params.id, req.session.user?._id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.status(404).end());
};


export default getNotification;
