import { Request, Response } from "express";
import { loggerTitle } from "types";
import Database from "../../connectors/mongo";
import logger from "../../util/logger";

const signup = (req: Request, res: Response) => {
  if (req.body.terms === "on") {
    Database.User.insert(req.session.user!)
      .then((result) => {
        req.session.user!._id = result.insertedId;
        res.status(200).redirect("http://localhost:3000");
      })
      .catch((e) => {
        logger.error(loggerTitle.AUTH_CLIENT, "Error signing up User", e);
        res.status(500).end();
      });
  } else res.status(403).send("Terms need to be accepted");
};

export default signup;
