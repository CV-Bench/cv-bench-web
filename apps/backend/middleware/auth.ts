import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //user is logged in
  if (
    req.session.user ||
    req.method === "OPTIONS" ||
    req.path.startsWith("/auth") ||
    req.path.startsWith("/task/finish") ||
    req.path.startsWith("/task/stop") ||
    req.path.startsWith("/datasetPreview")
  ) {
    next();

    return;
  }

  res.status(403).end();
};

export default authMiddleware;
