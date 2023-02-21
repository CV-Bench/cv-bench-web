import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./middleware/session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import googleAuthRouter from "./routes/auth/google";
import { IdTokenClaims, TokenSet } from "openid-client";
import logger from "./util/logger";
import loggerMiddleware from "./middleware/logger";
import validatorMiddleware from "./middleware/validator";
import { RouteNames, route } from "types";

import getModel from "./routes/model/[id]/get";
import deleteModel from "./routes/model/[id]/delete";
import getModels from "./routes/model/get";
import patchModel from "./routes/model/[id]/patch";
import postModel from "./routes/model/[id]/post";

import getDataset from "./routes/dataset/[id]/get";
import deleteDataset from "./routes/dataset/[id]/delete";
import getDatasets from "./routes/dataset/get";
import patchDataset from "./routes/dataset/[id]/patch";
import postDataset from "./routes/dataset/[id]/post";

import getNetwork from "./routes/network/[id]/get";
import deleteNetwork from "./routes/network/[id]/delete";
import getNetworks from "./routes/network/get";
import patchNetwork from "./routes/network/[id]/patch";
import postNetwork from "./routes/network/[id]/post";

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
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(rateLimiterMiddleware);
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(sessionMiddleware);
app.use(validatorMiddleware);
app.use(loggerMiddleware);
// app.use(rateLimiterMiddleware);

// MODEL ROUTES
app.get(route(RouteNames.GET_MODELS), getModels);
app.get(route(RouteNames.GET_MODEL), getModel);
app.get(route(RouteNames.DELETE_MODEL), deleteModel);
app.get(route(RouteNames.PATCH_MODEL), patchModel);
app.get(route(RouteNames.POST_MODEL), postModel);

// DATASET ROUTES
app.get(route(RouteNames.GET_DATASETS), getDatasets);
app.get(route(RouteNames.GET_DATASET), getDataset);
app.get(route(RouteNames.DELETE_DATASET), deleteDataset);
app.get(route(RouteNames.PATCH_DATASET), patchDataset);
app.get(route(RouteNames.POST_DATASET), postDataset);

// NETWORK ROUTES
app.get(route(RouteNames.GET_NETWORKS), getNetworks);
app.get(route(RouteNames.GET_NETWORK), getNetwork);
app.get(route(RouteNames.DELETE_NETWORK), deleteNetwork);
app.get(route(RouteNames.PATCH_NETWORK), patchNetwork);
app.get(route(RouteNames.POST_NETWORK), postNetwork);

//get routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/", (req, res) => {
  res.send(JSON.stringify(req.body));
});

// app.get("/model", getModel);

// post("/model", PostModelBody);

app.use("/auth/google/", googleAuthRouter);

app.listen(port, () => {
  logger.info(
    "EXPRESS SERVER",
    `⚡️ Server is running at http://localhost:${port}`
  );
});
