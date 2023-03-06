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

  import { collectionRequest } from "./";
  
  import Task from "./task";
  import Dataset from "./dataset";

  const find = async (taskOrDatasetId: string | ObjectId, userId: string | undefined) => {
    const hasViewRight = (await Task.findOne(taskOrDatasetId, userId)) ?? (await Dataset.findOne(taskOrDatasetId, userId));
    
    if (!hasViewRight) {
      return null;
    }

    return collectionRequest<DatasetPreviewDb>(CollectionName.DATASET_PREVIEW, async (collection) => {
      return collection.find({
        taskId: new ObjectId(taskOrDatasetId)
      });
    });
  }
  
  
  const insert = (preview: Omit<DatasetPreviewDb, "createdAt">) =>
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
  
  
  
  const DatasetPreview = {
    //findOne,
    insert,
    deleteOne,
    find
  };
  
  export default DatasetPreview;
  