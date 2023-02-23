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
import { RouteNames, route, loggerTitle } from "types";

import {
  deleteModel,
  downloadModel,
  getModel,
  getModelList,
  updateModel,
  uploadModel,
} from "./routes/model";
import {
  deleteBackground,
  downloadBackground,
  getBackground,
  getBackgroundList,
  updateBackground,
  uploadBackground,
} from "./routes/background";
import appTokenMiddleware from "./middleware/appTokenMiddleware";

declare module "express-session" {
  interface SessionData {
    tokenSet?: TokenSet;
    tokenClaims?: IdTokenClaims;
  }
}

const bodyParser = require("body-parser");

// dotenv.config({ path: "../../.env" });

const app: Express = express();
const port = process.env.EXPRESS_PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    `Origin, X-Requested-With, Content-Type, Accept, Authorization, ${process.env.NEXT_PUBLIC_APP_TOKEN_KEY}`
  );
  next();
});

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
app.use(appTokenMiddleware);
app.use(sessionMiddleware);
app.use(validatorMiddleware);
app.use(loggerMiddleware);
// app.use(rateLimiterMiddleware);

app.use("/auth/google/", googleAuthRouter);

// MODEL ROUTES
app.get(route(RouteNames.GET_MODEL_LIST), getModelList);
app.get(route(RouteNames.GET_MODEL), getModel);
app.delete(route(RouteNames.DELETE_MODEL), deleteModel);
app.patch(route(RouteNames.PATCH_MODEL), updateModel);
app.post(route(RouteNames.POST_MODEL), uploadModel);
app.get(route(RouteNames.DOWNLOAD_MODEL), downloadModel);

// BACKGROUND ROUTES
app.get(route(RouteNames.GET_BACKGROUND_LIST), getBackgroundList);
app.get(route(RouteNames.GET_BACKGROUND), getBackground);
app.delete(route(RouteNames.DELETE_BACKGROUND), deleteBackground);
app.patch(route(RouteNames.PATCH_BACKGROUND), updateBackground);
app.post(route(RouteNames.POST_BACKGROUND), uploadBackground);
app.get(route(RouteNames.DOWNLOAD_BACKGROUND), downloadBackground);

app.listen(port, () => {
  logger.info(
    loggerTitle.EXPRESS_SERVER,
    `⚡️ Server is running at http://localhost:${port}`
  );
});
