import { Request, Response, NextFunction } from "express";

const appTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  if (
    !process.env.NEXT_PUBLIC_APP_TOKEN_KEY ||
    !req.headers[process.env.NEXT_PUBLIC_APP_TOKEN_KEY] ||
    req.headers[process.env.NEXT_PUBLIC_APP_TOKEN_KEY] !=
      process.env.NEXT_PUBLIC_APP_TOKEN
  ) {
    res.status(403).end();
    return;
  }

  next();
};

export default appTokenMiddleware;
