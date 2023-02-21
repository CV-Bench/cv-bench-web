import { Request, Response, NextFunction } from "express";
import { PostModelBody, Route } from "types";
import logger from "../util/logger";

const validatorMap: Route = {
  "/model/post": PostModelBody,
};

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validator = validatorMap[(req.path + req.method).toLowerCase()];
    if (validator) req.body = validator.parse(req.body);
    next();
  } catch (e) {
    logger.error(
      "EXPRESS REQUEST",
      `Request on Route: ${(req.path + req.method).toLowerCase()}`,
      "Failed to pass Validator!"
    );
    res.status(400).send("Bad Request");
  }
};

export default validatorMiddleware;
