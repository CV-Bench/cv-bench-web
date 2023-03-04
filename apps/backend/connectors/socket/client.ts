import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Server } from "socket.io";
import * as util from 'util';
import {
  ClientToServerEvents,
  loggerTitle,
  ServerToClientEvents
} from "shared-types";

import { sessionMiddleware } from "../../middleware/session";
import logger from "../../util/logger";
import { redisClient } from "../redis";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiterSocket",
  points: 10, // 10 requests
  duration: 1 //per 1 second
});

//TODO fix cors for prod
const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  parseInt(process.env.SOCKET_PORT || "3002"),
  {
    cors: {
      origin: ["http://localhost:3000", process.env.HOST_DOMAIN!, "https://admin.socket.io"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"]
  }
);

io.engine.on("connection_error", (e) => {
  logger.error(loggerTitle.SOCKET, "Root Namespace", util.inspect(e.req), e.code, e.message, util.inspect(e.context));
});

// SERVER SOCKET

io.on("connection", (socket) => {
  logger.debug(loggerTitle.SOCKET, "Socket connected:", socket.id);
  socket.onAny(async (event, ...args) => {
    logger.debug(
      loggerTitle.SOCKET,
      "Socket Message incoming:",
      event,
      JSON.stringify(args)
    );
    try {
      // await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      socket.emit(event, args);
    } catch (rejRes: any) {
      // no available points to consume
      // emit error or warning message
      socket.emit("blocked", rejRes.msBeforeNext);
    }
  });
});

export default io;
