import { Request, Response } from "express";

const logout = (req: Request, res: Response) => {
  //TODO fix session persiting
  req.session.destroy((e) => {
    if (e) res.status(500).end();
    else res.clearCookie("cv-bench-session").status(200).end();
  });
};

export default logout;
