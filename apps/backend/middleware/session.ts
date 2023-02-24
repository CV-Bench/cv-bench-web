import { redisClient, RedisStore } from "../connectors/redis";
import { v4 as uuid } from "uuid";
import session from "express-session";
import { Request } from "express";

const sessionOptions = {
  secret: process.env?.SESSION_SECRET || "secret",
  genid: (req: Request) => {
    return uuid();
  },
  name: "cv-bench-session",
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 360000,
  },
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({client: redisClient, ttl: 360000})
};

export const sessionMiddleware = session(sessionOptions);