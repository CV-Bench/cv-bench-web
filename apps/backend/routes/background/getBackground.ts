import { Request, Response } from "express";

const getBackground = (req: Request, res: Response) => {
  console.log("Get single Background", req.params.id);
  res.end();
};

export default getBackground;
