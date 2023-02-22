import { Request, Response } from "express";

const getModels = (req: Request, res: Response) => {
  console.log("Get Models");
  res.end();
};

export default getModels;
