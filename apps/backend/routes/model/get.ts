import { Request, Response } from "express";

export const getModel = (req: Request, res: Response) => {
  console.log(req);

  console.log("TEST");

  res.end();
};
