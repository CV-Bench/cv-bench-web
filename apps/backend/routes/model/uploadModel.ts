import { Request, Response } from "express";

const uploadModel = async (req: Request, res: Response) => {
  console.log("UPLOAD MODEL");

  res.end();
};

export default uploadModel;
