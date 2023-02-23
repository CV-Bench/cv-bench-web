import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const updateModel = (req: Request, res: Response) => {
  console.log(req.params.id);

  Database.Model.updateOne(req.params.id, req.session.userId, req.body).then(
    res.status(200).end
  );
};

export default updateModel;
