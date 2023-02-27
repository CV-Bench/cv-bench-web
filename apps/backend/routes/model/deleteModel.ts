import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const deleteS3Model = async (id: string, key?: string) => {
  if (!key) {
    return;
  }
  let filename = key.replace(/^.*[\\\/]/, "");
  await S3.Model.delete(`${id}/${filename}`);
};

const deleteS3Models = (id: string) =>
  new Promise((resolve, reject) => {
    S3.Model.list(id, {
      onSuccess: async (out) => {
        await Promise.all(
          out.Contents?.map((x) => deleteS3Model(id, x.Key)) ?? []
        );
        resolve(true);
      },
      onError: () => reject(),
    });
  });

const deleteModel = async (req: Request, res: Response) => {
  // ToDo: set user id from session when available
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  // Delete Model from DB
  const delResult = await Database.Model.deleteOne(req.params.id, userId);

  if (delResult.deletedCount != 1) {
    res.status(404).end();
    return;
  }

  await deleteS3Models(req.params.id);
  res.json({}).end();
};

export default deleteModel;
