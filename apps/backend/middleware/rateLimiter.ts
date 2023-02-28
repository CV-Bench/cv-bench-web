import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { redisClient } from "../connectors/redis";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiterMiddleware",
  points: 10, // 10 requests
  duration: 1 //per 1 second
});

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

export default rateLimiterMiddleware;
