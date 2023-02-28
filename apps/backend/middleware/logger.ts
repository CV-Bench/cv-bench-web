import { Request, Response, NextFunction } from "express";

import { loggerTitle } from "types";

import logger from "../util/logger";

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
