import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(
    "EXPRESS REQUEST",
    `Session: ${req.session.id}`,
    `Method: ${req.method}`,
    `Route: ${req.url}`
  );

  next();
};

export default loggerMiddleware;
