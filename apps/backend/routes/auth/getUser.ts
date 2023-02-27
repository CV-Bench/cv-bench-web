import { Request, Response } from "express";

const getUser = (req: Request, res: Response) => {
  try {
    res.status(200).send(req.session.user);
  } catch {
    res.status(500).end();
  }
};

export default getUser;
