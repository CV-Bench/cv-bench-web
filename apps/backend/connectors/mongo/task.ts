import {
  AggregationCursor,
  DeleteResult,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult
} from "mongodb";

import { CollectionName, TaskDb, TaskStatus } from "shared-types";

import { collectionRequest } from "./";
import { isUsersOrPublic } from "./utils";

const findOne = (id: string | ObjectId, userId: string | undefined) =>
  collectionRequest<TaskDb>(CollectionName.TASK, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...(userId ? isUsersOrPublic(userId) : {})
    });
  });

const insert = (model: Omit<TaskDb, "_id" | "updatedAt" | "createdAt">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.TASK,
    async (collection) => {
      return collection.insertOne({
        ...model,
        updatedAt: new Date(),
        createdAt: new Date()
      });
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId | undefined,
  update: Partial<TaskDb>
) =>
  collectionRequest<UpdateResult>(CollectionName.TASK, async (collection) => {
    return collection.updateOne(
      {
        _id: new ObjectId(id),
        ...(userId ? { userId: new ObjectId(userId) } : {})
      },
      { $set: { ...update, updatedAt: new Date() } }
    );
  });

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DeleteResult>(CollectionName.TASK, async (collection) => {
    return collection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    });
  });

const find = (userId: string | ObjectId) =>
  collectionRequest<FindCursor<TaskDb>>(
    CollectionName.TASK,
    async (collection) => {
      return collection.find({
        userId: new ObjectId(userId)
      });
    }
  );

const countServerTasks = () =>
  collectionRequest<AggregationCursor<{ serverId: string; tasks: number }>>(
    CollectionName.TASK,
    async (collection) => {
      return collection.aggregate([
        {
          $match: {
            status: TaskStatus.RUNNING,
            serverId: {
              $ne: null
            }
          }
        },
        {
          $group: {
            _id: "$serverId",
            tasks: {
              $push: {
                status: "$status"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            serverId: "$_id",
            tasks: {
              $size: "$tasks"
            }
          }
        }
      ]);
    }
  );

const Task = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find,
  countServerTasks
};

export default Task;
