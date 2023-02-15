import * as redis from "redis";
import session from "express-session";
import logger from "../util/logger";

export const redisClient = redis.createClient({legacyMode: true});
redisClient.connect().catch((e) => {
    logger.error("REDIS CLIENT", e);
});

export const RedisStore = require("connect-redis")(session);