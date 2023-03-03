import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { DataUrlFile, GetModel, ModelDb } from "shared-types";

import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getS3Models = (id: string) =>
  new Promise<DataUrlFile[]>((resolve, reject) => {
    Model.list(id, {
      onSuccess: async (result) => {
        const files =
          result.Contents?.map(async (x) => {
            const filename = x.Key?.replace(/^.*[\\\/]/, "") ?? "";
            const fileExt = filename.split(".").pop();
            const s3Req = await Model.get(`${id}/${filename}`);
            const res = await s3Req.Body.transformToString("base64");

            return {
              filename,
              dataUrl: `data:application/${fileExt};base64,${res}`
            };
          }) ?? [];

        resolve(await Promise.all(files));
      }
    });
  });

const getModel = async (req: Request, res: Response) => {
  const dbModel = await Database.Model.findOne(
    req.params.id,
    req.session.user?._id
  );

  if (!dbModel) {
    res.status(404).end();
    return;
  }

  const isModel = (url: string) =>
    url.toLowerCase().endsWith(".obj") || url.toLowerCase().endsWith(".ply");
  const s3Files = await getS3Models(req.params.id);
  const modelObject = s3Files.find((x) => isModel(x.filename));
  const modelAssets = s3Files.filter((x) => !isModel(x.filename));

  if (!modelObject) {
    res.status(404).end();
    return;
  }

  const returnModel: GetModel = {
    ...dbModel,
    modelObject,
    modelAssets
  };

  res.json(returnModel).end();
};

export default getModel;
