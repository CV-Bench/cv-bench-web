import { Response } from "express";

import { PostDataset, TypedRequest } from "shared-types";

const createDatasetConfiguration = (req: TypedRequest<PostDataset>, res: Response) => {

    console.log(req.body)

};

export default createDatasetConfiguration;
