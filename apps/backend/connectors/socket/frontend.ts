import { Namespace } from "socket.io";
import { DataNamespaceClientToServerEvents, DataNamespaceData, DataNamespaceServerToClientEvents, DataType } from "types";
import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";
import * as socketJwt from "socketio-jwt";

const frontendNamespace:Namespace = io.of("/frontend");

frontendNamespace.use(socketJwt.authorize({
    secret: process.env.SOCKET_SESSION_SECRET!,
    handshake: true
}));

frontendNamespace.on("connection", (socket) => {
  socket.onAny(async (event, ...args) => {
    try {
      socket.emit(event, args);
    } catch (rejRes: any) {
      // no available points to consume
      // emit error or warning message
      socket.emit("blocked", rejRes.msBeforeNext);
    }
  });
});