import { Response } from "express";

import { PostDataset, TypedRequest } from "shared-types";

const createDataset = (req: TypedRequest<PostDataset>, res: Response) => {

    console.log(req.body)

};

export default createDataset;
