import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //user is logged in
<<<<<<< HEAD
    if (req.method == 'OPTIONS') {
      next();
      return;
    }
    if(req.session.user)
=======
    if(req.session.user || req.method === "OPTIONS")
>>>>>>> main
        next();
    else {
        //only allow auth requests
        if(req.path.startsWith("/auth"))
            next();
        else
            res.status(403).end();
    }
};

export default authMiddleware;
