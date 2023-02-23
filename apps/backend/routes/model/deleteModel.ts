import { Request, Response } from "express";
import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const deleteModel = (req: Request, res: Response) => {
  const actions = [];

  // Delete Model from DB
  actions.push(Database.Model.deleteOne(req.params.id, req.session.userId));

  // Delete Model from Bucket
  actions.push(S3.Model.delete(req.params.id));

  Promise.all(actions).then(res.status(200).end).catch(res.status(500).end);
};

export default deleteModel;
