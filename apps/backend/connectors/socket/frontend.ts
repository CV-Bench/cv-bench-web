import { Namespace } from "socket.io";
import * as socketJwt from "socketio-jwt";
import * as util from 'util';

import {
  DataNamespaceClientToServerEvents,
  DataNamespaceData,
  DataNamespaceServerToClientEvents,
  DataType,
  loggerTitle
} from "shared-types";

import io from "./client";
import { serverAuthMiddleware, serverRegistryMiddleware } from "./middleware";
import logger from "../../util/logger";

const frontendNamespace: Namespace = io.of("/frontend");

// frontendNamespace.use(
//   socketJwt.authorize({
//     secret: process.env.SOCKET_SESSION_SECRET!,
//     handshake: true,
//     callback: false
//   })
// );

io.engine.on("connection_error", (e) => {
  logger.error(loggerTitle.SOCKET, "Frontend Namespace", util.inspect(e.req), e.code, e.message, util.inspect(e.context));
});

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
