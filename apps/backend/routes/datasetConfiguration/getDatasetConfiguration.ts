import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const getDatasetConfiguration = (req: Request, res: Response) => {};

export default getDatasetConfiguration;
