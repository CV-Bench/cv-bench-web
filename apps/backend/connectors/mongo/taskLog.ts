import { ObjectId, UpdateResult } from "mongodb";

import {
  CollectionName,
  TaskLogUpdateData,
  TaskLogUpdateDb
} from "shared-types";

import { collectionRequest } from "./";

const findOne = (id: string | ObjectId) =>
  collectionRequest<TaskLogUpdateDb>(
    CollectionName.TASK_LOG,
    async (collection) => {
      return collection.findOne({
        _id: new ObjectId(id)
      });
    }
  );

const upsertOne = (id: string | ObjectId, upsert: TaskLogUpdateData) =>
  collectionRequest<UpdateResult>(
    CollectionName.TASK_LOG,
    async (collection) => {
      return collection.updateOne(
        {
          _id: new ObjectId(id)
        },
        { $set: { ...upsert, updatedAt: new Date() } },
        { upsert: true }
      );
    }
  );

const TaskLog = {
  findOne,
  upsertOne
};

export default TaskLog;
