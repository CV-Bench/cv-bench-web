import express, { Express, Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./middleware/session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import googleAuthRouter from "./routes/auth/google";
import rateLimiterMiddleware from "./middleware/rateLimiter";
import { IdTokenClaims, TokenSet } from "openid-client";
import logger from "./util/logger";
import loggerMiddleware from "./middleware/logger";
import * as z from "zod";
import validatorMiddleware from "./middleware/validator";
import { getModel } from "./routes/model/get";
import { PostModelBody } from "types";

declare module "express-session" {
  interface SessionData {
    tokenSet?: TokenSet;
    tokenClaims?: IdTokenClaims;
  }
}

const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "../../.env" });

const app: Express = express();
const port = process.env.EXPRESS_PORT || 3001;

//development middleware
if (app.get("env") === "development") app.use(cors());
//apply middleware
app.use(sessionMiddleware);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(loggerMiddleware);
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(rateLimiterMiddleware);

const post = (
  uri: string,
  bodyObject: Zod.AnyZodObject,
  ...handlers: Array<RequestHandler>
) =>
  app.post(
    uri,
    (req, res, next) => validatorMiddleware(req, res, next, bodyObject),
    ...handlers
  );

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/", (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.get("/model", getModel);

post("/model", PostModelBody);

app.use("/auth/google/", googleAuthRouter);

app.listen(port, () => {
  logger.info(
    "EXPRESS SERVER",
    `⚡️ Server is running at http://localhost:${port}`
  );
});
