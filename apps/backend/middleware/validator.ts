import { Request, Response, NextFunction } from "express";

const validatorMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
  bodyObject: Zod.AnyZodObject
) => {
  req.body = bodyObject.parse(req.body);

  next();
};

export default validatorMiddleware;
