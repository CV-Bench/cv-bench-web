import { Request, Response } from "express";
import Database from "../../connectors/mongo";
import io, { Socket } from "../../connectors/socket";

const getModels = (req: Request, res: Response) => {
  console.log("Get Models");

  // Get all available Models
  // Database.Model.find(req.session.userId).then((models) =>
  //   res.status(200).json({ models: models.toArray() })
  // );
  Socket.Task.start("test");

  res.json([]);
};

export default getModels;
