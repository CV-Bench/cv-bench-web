import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getModels = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.session.user?._id);

  const dbResult = await (await Database.Model.find(userId)).toArray();

  res.json(dbResult);
};

export default getModels;
