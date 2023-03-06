import { Request } from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";

import { redisClient, RedisStore } from "../connectors/redis";

const sessionOptions = {
  secret: process.env?.SESSION_SECRET || "secret",
  genid: (req: Request) => {
    return uuid();
  },
  name: "cv-bench-session",
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    ...(process.env.NODE_ENV === "production"
      ? {
          domain: process.env.COOKIE_BASE,
          secure: true
        }
      : {})
  },
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient, ttl: 360000 })
};

export const sessionMiddleware = session(sessionOptions);
