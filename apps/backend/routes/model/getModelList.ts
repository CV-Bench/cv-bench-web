import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Database from "../../connectors/mongo";

const getModels = async (req: Request, res: Response) => {
  const ids =
    req.query.ids == ""
      ? []
      : req.query.ids
          ?.toString()
          .split(",")
          .map((x) => new ObjectId(x));

  let dbCall;
  if (ids) {
    dbCall = Database.Model.findByIds(req.session.user?._id, ids);
  } else {
    dbCall = Database.Model.find(req.session.user?._id);
  }

  dbCall
    .then((result) =>
      result.toArray().then((models) => res.status(200).json(models))
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default getModels;
