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
  import { isUsersOrPublic } from "./utils";
  
  import Task from "./task";
  import Dataset from "./dataset";


  /*  TODO
  function isTaskOrDatasetOwner(){
  }

  function isTaskOrDatasetViewer(){

  }

  const findOne = (id: string | ObjectId, userId: string | undefined) =>
    collectionRequest<DatasetPreviewDb>(CollectionName.DATASET_PREVIEW, async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id),
        ...(userId ? isUsersOrPublic(userId) : {})
      });
    });

    const find = (userId: string | ObjectId) =>
    collectionRequest<FindCursor<DatasetPreviewDb>>(
      CollectionName.DATASET_PREVIEW,
      async (collection) => {
        return collection.findOne({
          $or: [
            { userId: new ObjectId(userId) },
            { accessType: AccessType.PUBLIC }
          ]
        });
      }
    );
  */
  
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
    //find
  };
  
  export default DatasetPreview;
  