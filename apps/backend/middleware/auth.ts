import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //user is logged in
    if (req.method == 'OPTIONS') {
      next();
      return;
    }
    if(req.session.user)
        next();
    else {
        //only allow auth requests
        if(req.path.startsWith("/auth"))
            next();
        else
            res.status(403).send("Unauthorized");
    }
};

export default authMiddleware;
