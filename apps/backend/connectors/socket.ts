import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Server } from "socket.io";

import { redisClient } from "../connectors/redis";
import { sessionMiddleware } from "../middleware/session";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiterSocket",
  points: 10, // 10 requests
  duration: 1 //per 1 second
});

const io = new Server(parseInt(process.env.SOCKET_PORT || "3002"), {});

io.use((socket, next) => {
  sessionMiddleware(
    socket.request as Request,
    {} as Response,
    next as NextFunction
  );
});

io.on("connection", (socket) => {
  socket.onAny(async (event, ...args) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      socket.emit(event, args);
    } catch (rejRes: any) {
      // no available points to consume
      // emit error or warning message
      socket.emit("blocked", { "retry-ms": rejRes.msBeforeNext });
    }
  });
});

export default io;
