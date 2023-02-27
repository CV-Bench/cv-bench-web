import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./middleware/session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import googleAuthRouter from "./routes/auth/google";
import logger from "./util/logger";
import loggerMiddleware from "./middleware/logger";
import validatorMiddleware from "./middleware/validator";
import { RouteNames, route, loggerTitle, SessionUser, AuthProvider } from "types";

import {
  deleteModel,
  getModel,
  getModelList,
  updateModel,
  uploadModel,
} from "./routes/model";
import {
  deleteBackground,
  getBackground,
  getBackgroundList,
  updateBackground,
  uploadBackground,
} from "./routes/background";
import appTokenMiddleware from "./middleware/appTokenMiddleware";
import authMiddleware from "./middleware/auth";
import getUser from "./routes/auth/getUser";
import microsoftAuthRouter from "./routes/auth/microsoft";
import signup from "./routes/auth/signup";
import logout from "./routes/auth/logout";

declare module "express-session" {
  interface SessionData {
    nonce: {
      [key in AuthProvider]?: string;
    }
    user?: SessionUser;
  }
}

const bodyParser = require("body-parser");

// dotenv.config({ path: "../../.env" });

const app: Express = express();
const port = process.env.EXPRESS_PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    `Origin, X-Requested-With, Content-Type, Accept, Authorization, ${process.env.NEXT_PUBLIC_APP_TOKEN_KEY}`
  );
  next();
});

//apply middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//app.use(appTokenMiddleware);
app.use(sessionMiddleware);
app.use(authMiddleware);
app.use(validatorMiddleware);
app.use(loggerMiddleware);
// app.use(rateLimiterMiddleware);

// AUTH ROUTES
// TODO make routes complient with other routes
app.use("/auth/google/", googleAuthRouter);
app.use("/auth/microsoft", microsoftAuthRouter);
app.get("/auth/user", getUser);
app.post("/auth/signup", signup);
app.get("/auth/logout", logout);

// MODEL ROUTES
app.get(route(RouteNames.GET_MODEL_LIST), getModelList);
app.get(route(RouteNames.GET_MODEL), getModel);
app.delete(route(RouteNames.DELETE_MODEL), deleteModel);
app.patch(route(RouteNames.PATCH_MODEL), updateModel);
app.post(route(RouteNames.POST_MODEL), uploadModel);

// BACKGROUND ROUTES
app.get(route(RouteNames.GET_BACKGROUND_LIST), getBackgroundList);
app.get(route(RouteNames.GET_BACKGROUND), getBackground);
app.delete(route(RouteNames.DELETE_BACKGROUND), deleteBackground);
app.patch(route(RouteNames.PATCH_BACKGROUND), updateBackground);
app.post(route(RouteNames.POST_BACKGROUND), uploadBackground);

app.listen(port, () => {
  logger.info(
    loggerTitle.EXPRESS_SERVER,
    `⚡️ Server is running at http://localhost:${port}`
  );
});

app.get("/", (req, res) => {
  res.status(200).send("HI");
});
