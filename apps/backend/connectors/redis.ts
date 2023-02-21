import * as redis from "redis";
import session from "express-session";
import logger from "../util/logger";
import { loggerTitle } from "types";

export const redisClient = redis.createClient({legacyMode: true});
redisClient.connect().catch((e) => {
    logger.error(loggerTitle.REDIS_CLIENT, e);
});

export const RedisStore = require("connect-redis")(session);