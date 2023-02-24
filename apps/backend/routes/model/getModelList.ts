import { Request, Response } from "express";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getModels = async (req: Request, res: Response) => {
  console.log("Get Models");

  // Get all available Models
  // Database.Model.find(req.session.userId).then((models) =>
  //   res.status(200).json({ models: models.toArray() })
  // );

  const result = await Model.list('');
  console.log('s3 Result', result);
  res.json([]);
};

export default getModels;
