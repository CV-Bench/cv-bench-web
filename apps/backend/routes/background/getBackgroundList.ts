import { Request, Response } from "express";
import Database from "../../connectors/mongo";
import { ObjectId } from "mongodb";

const getBackgrounds = (req: Request, res: Response) => {
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  Database.Background.find(userId)
    .then((result) =>
      result.toArray().then((backgrounds) => res.status(200).json(backgrounds))
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default getBackgrounds;
