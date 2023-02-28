import session from "express-session";
import * as redis from "redis";

import { loggerTitle } from "shared-types";

import logger from "../util/logger";

export const redisClient = redis.createClient({ legacyMode: true });
redisClient.connect().catch((e) => {
  logger.error(loggerTitle.REDIS_CLIENT, e);
});

export const RedisStore = require("connect-redis")(session);
