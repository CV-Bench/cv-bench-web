import { Request, Response, NextFunction } from "express";
import { findRouteValidator } from "types";
import logger from "../util/logger";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const route = findRouteValidator(req.path + req.method);

    if (route) {
      req.body = route.validator.parse(req.body);
    }

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
