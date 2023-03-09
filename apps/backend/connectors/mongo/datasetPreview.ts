import {
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import {
  AccessType,
  CollectionName,
  DatasetPreviewDb,
  loggerTitle
} from "shared-types";

import logger from "../../util/logger";

import { collectionRequest } from "./";
import Dataset from "./dataset";
import Task from "./task";
import { isUsersOrPublic } from "./utils";

const insertOne = (preview: Omit<DatasetPreviewDb, "createdAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.DATASET_PREVIEW,
    async (collection) => {
      return collection.insertOne({
        ...preview,
        createdAt: new Date()
      });
    }
  );

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(
    CollectionName.DATASET_PREVIEW,
    async (collection) => {
      return collection.deleteOne({
        _id: new ObjectId(id)
      });
    }
  );

const find = (taskId: string | ObjectId) =>
  collectionRequest<FindCursor<DatasetPreviewDb>>(
    CollectionName.DATASET_PREVIEW,
    async (collection) => {
      return collection.find({
        taskId: new ObjectId(taskId)
      });
    }
  );

const DatasetPreview = {
  //findOne,
  insertOne,
  deleteOne,
  find
};

export default DatasetPreview;
