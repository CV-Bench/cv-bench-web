import { Request, Response } from "express";

import {
  Bucket,
  DatasetDb,
  DataType,
  loggerTitle,
  ModelDb
} from "shared-types";

import Database from "../connectors/mongo";
import { getPresignedUrl } from "../connectors/s3";
import { Socket } from "../connectors/socket";
import logger from "../util/logger";

const download = (req: Request, res: Response) => {
  const dataType: DataType = req.params.type as DataType;
  const dataId = req.params.id;
  const user = req.session.user;

  // generate presigned url for client to download resource
  const sendDownloadLink = (key: string) => {
    getPresignedUrl(key).then((url) => {
      res.status(200).send(url);
    });
  };

  // ask server to upload data
  const requestDataUpload = () => {
    Socket.Data.upload(dataId, dataType);
  };

  // if no key request data upload, else return presigned url
  const processDbResult = (result: ModelDb | DatasetDb) => {
    if (!result.s3Key) {
      requestDataUpload();
      res.status(404).send("Content Unavailable");
    } else sendDownloadLink(result.s3Key);
  };

  const processDbError = (e: any) => {
    logger.error(
      loggerTitle.MONGO_CLIENT,
      "Express Route Download",
      "Accessing MongoDB failed",
      e
    );
  };

  // if undefined => bad request
  if (!dataId || !dataType) res.status(400).end();
  else {
    switch (dataType) {
      case DataType.DATASET:
        Database.Dataset.findOne(dataId, user?._id)
          .then(processDbResult)
          .catch(processDbError);
        break;
      case DataType.NETWORK:
        Database.Network.findOne(dataId, user?._id)
          .then(processDbResult)
          .catch(processDbError);
        break;
      default:
        res.status(400).end();
    }
  }
};

export default download;
