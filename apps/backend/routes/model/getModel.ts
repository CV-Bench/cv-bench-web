import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getModel = (req: Request, res: Response) => {
  // GET MODEL
  // INCLUDE S3 MODEL
  // Database.Model.findOne(req.params.id, req.session.userId).then((model) =>
  //   res.status(200).json(model)
  // );
  // S3.Model.get(req.params.id).then((model) => res.status(200).send(model));

  console.log(req);
};

export default getModel;
