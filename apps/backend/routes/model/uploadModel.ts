import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { DataUrlFile, loggerTitle, ModelDb, PostModel } from "shared-types";

import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";
import logger from "../../util/logger";

const putFile = async (path: string, file: DataUrlFile) =>
  Model.put(Buffer.from(file.dataUrl), `${path}/${file.filename}`);

const uploadModel = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.session.user?._id);

  let model = req.body as PostModel;

  let { modelObject, modelAssets, ...dbModel } = model;

  const result = await Database.Model.insert({
    ...dbModel,
    userId
  });

  const basePath = `${result.insertedId}`;
  const fileExt = modelObject.filename.split(".").pop();
  modelObject.filename = `model.${fileExt}`;

  logger.debug(loggerTitle.EXPRESS_REQUEST, "Uploading models to", basePath);

  await putFile(basePath, modelObject);
  await Promise.all(
    modelAssets?.map((asset) => putFile(basePath, asset)) ?? []
  );

  res.json({}).end();
};

export default uploadModel;
