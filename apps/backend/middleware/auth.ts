import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //user is logged in
  if (req.session.user || req.method === "OPTIONS") next();
  else {
    //only allow auth requests
    if (req.path.startsWith("/auth")) next();
    else res.status(403).end();
  }
};

export default authMiddleware;
