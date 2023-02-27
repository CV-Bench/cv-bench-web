import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getModels = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  const dbResult = await (await Database.Model.find(userId)).toArray();

  res.json(dbResult);
};

export default getModels;
