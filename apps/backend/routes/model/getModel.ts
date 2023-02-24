import { Request, Response } from "express";
import { DataUrlFile, GetModel, ModelDb } from "types";
import Database from "../../connectors/mongo";
import { Model } from "../../connectors/s3/model";

const getModel = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = 0 as any;

  if (!req.params.id  || req.params.id == "undefined") {
    res.status(404).end();
    return;
  }

  const dbModel = await Database.Model.findOne(req.params.id, userId);
  const returnModel: ModelDb & { modelObject?: DataUrlFile, modelAssets: DataUrlFile[] } = { ...dbModel, modelAssets: [] };
  Model.list(dbModel._id, { onSuccess: async (bucketRes) => {
    const mappedFiles = await Promise.all(bucketRes.Contents?.map(x => new Promise((resolve, reject) => {
      const path = x.Key as string;
      let filename = path.replace(/^.*[\\\/]/, '')

      Model.get(`${dbModel._id}/${filename}`, { onSuccess: async (obj) => {
        const dataUrlFile: DataUrlFile = {
          filename,
          dataUrl: await obj.Body?.transformToString() ?? ''
        };

        if (filename.endsWith('.obj')) {
          returnModel.modelObject = dataUrlFile;
        }
        else {
          returnModel.modelAssets.push(dataUrlFile);
        }
        resolve(returnModel);
      }, onError: () => console.error("s3 error", path)});
    })) ?? []);
    res.json(returnModel).end();
  }});

  //S3.Model.get(req.params.id).then((model) => res.status(200).send(model));
};

export default getModel;
