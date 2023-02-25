import { DataType } from "types";
import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";

const dataNamespace = io.of("/data");

dataNamespace.use(serverAuthMiddleware);
dataNamespace.use(serverRegistryMiddleware);

dataNamespace.on("connection", (socket) => {
  socket.onAny(async (event, ...args) => {
    try {
      socket.emit(event, args);
    } catch (rejRes: any) {
      // no available points to consume
      // emit error or warning message
      socket.emit("blocked", { "retry-ms": rejRes.msBeforeNext });
    }
  });
});

const uploadData = (dataId: string, dataType: DataType) =>
  dataNamespace.emit("upload", { dataId, dataType });

const deleteData = (dataId: string, dataType: DataType) =>
  dataNamespace.emit("delete", { dataId, dataType });

const Data = {
  upload: uploadData,
  deleteData: deleteData,
};

export default Data;
