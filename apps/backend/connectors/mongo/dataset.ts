import { Collection, InsertOneResult, ObjectId } from "mongodb";
import { AccessType, CollectionName, DatasetDb, loggerTitle } from "types";
import logger from "../../util/logger";
import { collectionRequest, prepareCollection } from "./";
import { isUsersOrPublic } from "./utils";

prepareCollection(CollectionName.DATASET).then((collection) => {
  logger.debug(
    loggerTitle.MONGO_CLIENT,
    `Collection Ready: ${collection.namespace}`
  );
});

const findOne = (id: string | ObjectId, userId: string) =>
  collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.findOne({
      _id: new ObjectId(id),
      ...isUsersOrPublic(userId),
    });
  });

const insert = (model: Omit<DatasetDb, "_id">) =>
  collectionRequest<InsertOneResult>(
    CollectionName.DATASET,
    async (collection) => {
      return collection.insertOne(model);
    }
  );

const updateOne = (
  id: string | ObjectId,
  userId: string | ObjectId,
  update: Partial<DatasetDb>
) =>
  collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.updateOne(
      {
        _id: new ObjectId(id),
        userId: new ObjectId(userId),
      },
      { $set: update }
    );
  });

const deleteOne = (id: string | ObjectId, userId: string | ObjectId) =>
  collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
  });

const find = (userId: string | ObjectId) =>
  collectionRequest<DatasetDb>(CollectionName.DATASET, async (collection) => {
    return collection.findOne({
      $or: [
        { userId: new ObjectId(userId) },
        { accessType: AccessType.PUBLIC },
      ],
    });
  });

const Dataset = {
  findOne,
  insert,
  updateOne,
  deleteOne,
  find,
};

export default Dataset;