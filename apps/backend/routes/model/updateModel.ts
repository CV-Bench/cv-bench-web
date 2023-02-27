import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";

const updateModel = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  const updateResult = await Database.Model.updateOne(
    req.params.id,
    userId,
    req.body
  );

  if (updateResult.matchedCount != 1) {
    res.status(404).end();
    return;
  }

  res.json({}).end();
};

export default updateModel;
