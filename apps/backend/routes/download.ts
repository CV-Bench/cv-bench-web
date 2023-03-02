import { Request, Response } from "express";

import { Bucket, DataType } from "shared-types";

import { getPresignedUrl } from "../connectors/s3";
import { Socket } from "../connectors/socket";

const download = (req: Request, res: Response) => {
  getPresignedUrl(req.params.bucket as Bucket, req.params.key)
    .then((url) => {
      res.status(200).send(url);
    })
    .catch(() => {
      Socket.Data.upload(req.params.dataId, req.params.dataType as DataType);
      res.status(200).end();
    });
};

export default download;
