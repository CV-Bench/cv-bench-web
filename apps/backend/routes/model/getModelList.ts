import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getModels = (req: Request, res: Response) => {
  console.log("Get Models");

  // Get all available Models
  // Database.Model.find(req.session.userId).then((models) =>
  //   res.status(200).json({ models: models.toArray() })
  // );

  res.json([]);
};

export default getModels;
