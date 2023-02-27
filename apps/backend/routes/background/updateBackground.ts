import { Request, Response } from "express";
import { PatchBackground, TypedRequest } from "types";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";

const updateBackground = (
  req: TypedRequest<PatchBackground>,
  res: Response
) => {
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  Database.Background.updateOne(req.params.id, userId, req.body)
    .then((result) => {
      if (result.matchedCount < 1) {
        return res.status(404).end();
      }

      res.status(200).json({});
    })
    .catch(() => {
      res.status(500).end();
    });
};

export default updateBackground;
