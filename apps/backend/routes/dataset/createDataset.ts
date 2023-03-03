import { Response } from "express";
import { ObjectId } from "mongodb";

import { PostDataset, TaskStatus, TaskType, TypedRequest } from "shared-types";
import Database from "../../connectors/mongo";

const createDataset = (req: TypedRequest<PostDataset>, res: Response) => {

    Database.Task.insert({
        userId: new ObjectId(req.session.user?._id),
        status: TaskStatus.PENDING,
        type: TaskType.CREATE_DATASET,
        info: {
            name: req.body.name,
            domainTags: req.body.domainTags,
            accessType: req.body.accessType,

            modelIds: req.body.models,
            distractorIds: [],
            backgrounds: req.body.images,
            datasetConfigurationId: req.body.configurationId
        }
    })

};

export default createDataset;
