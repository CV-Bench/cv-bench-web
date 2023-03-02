import { Request, Response } from "express";
import { Socket } from "../../connectors/socket";

const getTask = (req: Request, res: Response) => {
    Socket.Task.get(req.params.id).then(taskData => {
        res.status(200).send(taskData);
    }).catch(() => {
        res.status(500).end();
    })
};

export default getTask;
