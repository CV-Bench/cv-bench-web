import { Request, Response } from "express";

const getModel = (req: Request, res: Response) => {
  console.log("Get single Model", req.params.id);
  res.end();
};

export default getModel;
