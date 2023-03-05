import { Namespace } from "socket.io";

import {
  DataNamespaceClientToServerEvents,
  DataNamespaceData,
  DataNamespaceServerToClientEvents,
  DataType
} from "shared-types";

import Database, { dataTypeCollectionMap } from "../mongo";

import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";

const dataNamespace: Namespace<
  DataNamespaceClientToServerEvents,
  DataNamespaceServerToClientEvents
> = io.of("/data");

dataNamespace.use(serverAuthMiddleware);
dataNamespace.use(serverRegistryMiddleware);

dataNamespace.on("connection", (socket) => {
  socket.on("data_uploaded", ({ s3Key, dataType, dataId }) => {
    const collectionName = dataTypeCollectionMap(dataType);

    Database[collectionName].updateOne(dataId, undefined, { s3Key });

    // TODO SEND NOTIFICATION
  });

  socket.on("data_deleted", (data) => {
    // Do nothing
  });

  socket.on("upload_failed", (data) => {
    // Try different Server maybe
  });
});

const uploadData = (dataId: string, dataType: DataType) =>
  dataNamespace.emit("upload", { dataId, dataType });

const deleteData = (dataId: string, dataType: DataType) =>
  dataNamespace.emit("delete", { dataId, dataType });

const Data = {
  upload: uploadData,
  deleteData: deleteData
};

export default Data;
