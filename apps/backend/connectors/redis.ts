import * as redis from "redis";
import session from "express-session";

export const redisClient = redis.createClient({legacyMode: true});
redisClient.connect().catch(console.error);

export const RedisStore = require("connect-redis")(session);