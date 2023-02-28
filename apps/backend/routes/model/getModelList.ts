import { Request, Response } from "express";

import Database from "../../connectors/mongo";
import io, { Socket } from "../../connectors/socket";

const getModels = async (req: Request, res: Response) => {
  const dbResult = await (
    await Database.Model.find(req.session.user?._id)
  ).toArray();

  res.json(dbResult);
};

export default getModels;
