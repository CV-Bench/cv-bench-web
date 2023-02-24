import { Request, Response } from "express";
import { DataUrlFile, loggerTitle, ModelDb, PostModel } from "types";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";
import logger from "../../util/logger";

const putFile = async (path: string, file: DataUrlFile) => Model.put(Buffer.from(file.dataUrl), `${path}/${file.filename}`);

const uploadModel = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = 0 as any;

  let model = req.body as PostModel;

  let { modelObject, modelAssets, ...dbModel } = model;

  const result = await Database.Model.insert({...dbModel, createdAt: new Date(), updatedAt: new Date(), userId });

  const basePath = `${result.insertedId}`;
  const fileExt = modelObject.filename.split('.').pop();
  modelObject.filename = `model.${fileExt}`;

  logger.debug(loggerTitle.EXPRESS_REQUEST, 'Uploading models to', basePath);

  await putFile(basePath, modelObject);
  await Promise.all(modelAssets?.map(asset => putFile(basePath, asset)) ?? []);

  res.status(200).end();
};

export default uploadModel;
