import { Request, Response } from "express";

import { loggerTitle } from "shared-types";

import Database from "../../connectors/mongo";
import logger from "../../util/logger";

const signup = (req: Request, res: Response) => {
  if (req.body.terms === "on") {
    Database.User.insert(req.session.user!)
      .then((result) => {
        req.session.user!._id = result.insertedId;
        res.status(200).redirect(process.env.APP_DOMAIN!);
      })
      .catch((e) => {
        logger.error(loggerTitle.AUTH_CLIENT, "Error signing up User", e);
        res.status(500);
        req.session.destroy(() => {
          res.clearCookie("cv-bench-session").end();
        });
      });
  } else {
    req.session.destroy((e) => {
      res.clearCookie("cv-bench-session");
    });
    res.status(403).send("Terms need to be accepted");
  }
};

export default signup;
