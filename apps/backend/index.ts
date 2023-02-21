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
import getModel from "./routes/model/[id]/get";
import deleteModel from "./routes/model/[id]/delete";
import getModels from "./routes/model/get";
import { RouteNames, route } from "types";

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

//get routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.get("/model/:id", getModel);
app.delete("/model/:id", deleteModel);

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
