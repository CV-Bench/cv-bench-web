import { Request, Response, NextFunction } from "express";

const validatorMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
  bodyObject: Zod.AnyZodObject
) => {
  console.log(req.body, bodyObject);

  req.body = bodyObject.parse(req.body);

  next();
};

export default validatorMiddleware;
