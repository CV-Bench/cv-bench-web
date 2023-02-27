import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";

const updateModel = async (req: Request, res: Response) => {
  const updateResult = await Database.Model.updateOne(
    req.params.id,
    req.session.user?._id,
    req.body
  );

  if (updateResult.matchedCount != 1) {
    res.status(404).end();
    return;
  }

  res.json({}).end();
};

export default updateModel;
