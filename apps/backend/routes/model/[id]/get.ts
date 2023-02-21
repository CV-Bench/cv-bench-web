import { Request, Response } from "express";
import Model from "../../../connectors/mongo/model";

Model;

const getModel = (req: Request, res: Response) => {
  console.log("Get single Model", req.params.id);
  res.end();
};

export default getModel;
