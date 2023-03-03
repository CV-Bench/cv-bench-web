import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const socketToken = (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(403).end();
    return;
  }

  res.json({token: jwt.sign(req.session.user, process.env.SOCKET_SESSION_SECRET!)});
};

export default socketToken;