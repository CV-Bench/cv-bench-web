import { Request, Response } from "express";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getModels = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = 0 as any;

  const dbResult = await (await Database.Model.find(userId)).toArray();
  
  //const result = await Model.list('');
//   console.log('s3 Result', result);
  res.json(dbResult);
};

export default getModels;
