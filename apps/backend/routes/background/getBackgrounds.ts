import { Request, Response } from "express";

const getBackgrounds = (req: Request, res: Response) => {
  console.log("Get Backgrounds");

  res.end();
};

export default getBackgrounds;
