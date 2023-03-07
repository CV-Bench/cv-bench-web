import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";
import https from "https";

import {
  RouteNames,
  route,
  loggerTitle,
  SessionUser,
  AuthProvider
} from "shared-types";

import socket, { Socket } from "./connectors/socket";
import io from "./connectors/socket/client";
import authMiddleware from "./middleware/auth";
import loggerMiddleware from "./middleware/logger";
import { sessionMiddleware } from "./middleware/session";
import validatorMiddleware from "./middleware/validator";
import getUser from "./routes/auth/getUser";
import googleAuthRouter from "./routes/auth/google";
import logout from "./routes/auth/logout";
import microsoftAuthRouter from "./routes/auth/microsoft";
import signup from "./routes/auth/signup";
import socketToken from "./routes/auth/socketToken";
import {
  deleteBackground,
  getBackground,
  getBackgroundList,
  updateBackground,
  uploadBackground
} from "./routes/background";
import {
  getDatasetList,
  getDataset,
  deleteDataset,
  createDataset,
  updateNetwork
} from "./routes/dataset";
import updateDataset from "./routes/dataset/updateDataset";
import {
  createDatasetConfiguration,
  deleteDatasetConfiguration,
  getDatasetConfiguration,
  getDatasetConfigurationList,
  updateDatasetConfiguration
} from "./routes/datasetConfiguration";
import {
  createDatasetPreview
} from "./routes/datasetPreview"
import download from "./routes/download";
import {
  deleteModel,
  getModel,
  getModelList,
  updateModel,
  uploadModel
} from "./routes/model";
import {
  getNetworkList,
  getNetwork,
  deleteNetwork,
  createNetwork
} from "./routes/network";
import { getNetworkArchitectureList } from "./routes/networkArchitecture";
import {
  getNotificationList,
  getNotification,
  deleteNotification,
  updateNotification
} from "./routes/notification";
import { finishTask, stopTask, getTask, getTaskList } from "./routes/task";
import logger from "./util/logger";

declare module "express-session" {
  interface SessionData {
    nonce: {
      [key in AuthProvider]?: string;
    };
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
    `Origin, X-Requested-With, Content-Type, Accept, Authorization`
  );
  next();
});

//apply middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
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
app.get("/auth/token", socketToken);

// DOWNLOAD ROUTE
app.get("/download/:type/:id", download);

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

// DATASET ROUTES
app.get(route(RouteNames.GET_DATASET_LIST), getDatasetList);
app.get(route(RouteNames.GET_DATASET), getDataset);
app.delete(route(RouteNames.DELETE_DATASET), deleteDataset);
app.patch(route(RouteNames.PATCH_DATASET), updateDataset);
app.post(route(RouteNames.POST_DATASET), createDataset);

// DATASET CONFIGURATION ROUTES
app.get(
  route(RouteNames.GET_DATASET_CONFIGURATION_LIST),
  getDatasetConfigurationList
);
app.get(route(RouteNames.GET_DATASET_CONFIGURATION), getDatasetConfiguration);
app.delete(
  route(RouteNames.DELETE_DATASET_CONFIGURATION),
  deleteDatasetConfiguration
);
app.patch(
  route(RouteNames.PATCH_DATASET_CONFIGURATION),
  updateDatasetConfiguration
);
app.post(
  route(RouteNames.POST_DATASET_CONFIGURATION),
  createDatasetConfiguration
);

//DATASET PREVIEW ROUTES
app.post(
  route(RouteNames.POST_TASK_DATASETPREVIEW),
  createDatasetPreview
)

// NETWORK ROUTES
app.get(route(RouteNames.GET_NETWORK_LIST), getNetworkList);
app.get(route(RouteNames.GET_NETWORK), getNetwork);
app.delete(route(RouteNames.DELETE_NETWORK), deleteNetwork);
app.patch(route(RouteNames.PATCH_NETWORK), updateNetwork);
app.post(route(RouteNames.POST_NETWORK), createNetwork);

// TASK ROUTES
app.get(route(RouteNames.GET_TASK_LIST), getTaskList);
app.get(route(RouteNames.GET_TASK), getTask);
app.post(route(RouteNames.FINISH_TASK), finishTask);
app.post(route(RouteNames.STOP_TASK), stopTask);

// NETWORK ARCHITECTURE
app.get(
  route(RouteNames.GET_NETWORK_ARCHITECTURE_LIST),
  getNetworkArchitectureList
);

// NOTIFICATION ROUTES
app.get(route(RouteNames.GET_NOTIFICATION_LIST), getNotificationList);
app.get(route(RouteNames.GET_NOTIFICATION), getNotification);
app.post(route(RouteNames.DELETE_NOTIFICATION), deleteNotification);
app.patch(route(RouteNames.READ_NOTIFICATION), updateNotification);

// socket;

if (process.env.NODE_ENV === "production") {
  var options = {
    key: fs.readFileSync("/home/reyk/cv-bench-web/apps/backend/client-key.pem"),
    cert: fs.readFileSync(
      "/home/reyk/cv-bench-web/apps/backend/client-cert.pem"
    )
  };

  const server = https.createServer(options, app).listen(port);

  io.attach(server);
} else {
  const server = app.listen(port, () => {
    logger.info(
      loggerTitle.EXPRESS_SERVER,
      `⚡ Server is running at http://localhost:${port}`
    );
  });

  io.attach(server);
}

app.get("/", (req, res) => {
  res.status(200).send("HI");
});
