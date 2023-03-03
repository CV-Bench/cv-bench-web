import { Request, Response } from "express";
import { FindCursor, ObjectId } from "mongodb";

import { BackgroundDb } from "shared-types";

import Database from "../../connectors/mongo";

const getBackgrounds = (req: Request, res: Response) => {
  const tags =
    req.query.domainTags == ""
      ? []
      : req.query.domainTags?.toString().split(",");

  const ids =
    req.query.ids == ""
      ? []
      : req.query.ids
          ?.toString()
          .split(",")
          .map((x) => new ObjectId(x));

  let dbCall: Promise<FindCursor<BackgroundDb>>;

  if (tags) {
    dbCall = Database.Background.findByTags(req.session.user?._id, tags);
  } else if (ids) {
    dbCall = Database.Background.findByIds(req.session.user?._id, ids);
  } else {
    dbCall = Database.Background.find(req.session.user?._id);
  }

  dbCall
    .then((result) =>
      result.toArray().then((backgrounds) => res.status(200).json(backgrounds))
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default getBackgrounds;
