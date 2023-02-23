import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { loggerTitle } from "types";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(
    loggerTitle.EXPRESS_REQUEST,
    `Session: ${req.session.id}`,
    `Method: ${req.method}`,
    `Route: ${req.url}`
  );

  next();
};

export default loggerMiddleware;
