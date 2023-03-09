import { DeleteResult, FindCursor, InsertOneResult, ObjectId } from "mongodb";

import { CollectionName, NetworkPreviewDb } from "shared-types";

import { collectionRequest } from "./";

const insertOne = (preview: Omit<NetworkPreviewDb, "createdAt">) =>
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
  collectionRequest<FindCursor<NetworkPreviewDb>>(
    CollectionName.DATASET_PREVIEW,
    async (collection) => {
      return collection.find({
        taskId: new ObjectId(taskId)
      });
    }
  );

const NetworkPreview = {
  insertOne,
  deleteOne,
  find
};

export default NetworkPreview;
