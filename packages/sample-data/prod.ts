import dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";

import { CollectionName, DatasetFormat } from "shared-types";

dotenv.config({ path: "../../.env" });

const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URL || "");

const createNetworkArchitectures = (db: Db) => {
  db.collection(CollectionName.NETWORK_ARCHITECTURE).deleteMany({});

  const now = new Date();

  const networks = [
    {
      name: "FasterRCCN",
      description:
        "Faster-RCNN is a widely used two-stage object detection model that introduces a region proposal network (RPN) to generate object proposals and a Fast R-CNN network to classify and refine these proposals. It achieves high accuracy in detecting objects while also being computationally efficient.",
      identifier: "faster_rcnn_r50_fpn",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "RetinaNet",
      description:
        "RetinaNet is a state-of-the-art single-stage object detection model that uses a feature pyramid network and a focal loss function to address the issue of class imbalance in object detection. It achieves high accuracy and efficiency in detecting objects at various scales and aspect ratios.",
      identifier: "retinanet_r50_fpn",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "Yolo V3",
      description:
        "Yolo V3 (You Only Look Once version 3) is a real-time object detection model that uses a single neural network to detect objects in images and videos. It uses a fully convolutional architecture and predicts bounding boxes and class probabilities directly from full images in a single forward pass. Yolo V3 also employs a feature extractor based on Darknet-53, which is a variant of the Darknet architecture that uses residual connections and skip connections to improve feature extraction. It is known for its high accuracy and fast processing speed.",
      identifier: "yolo_v3",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "Yolo X",
      description:
        "YOLOX is a single-stage object detector that makes several modifications to YOLOv3 with a DarkNet53 backbone. Specifically, YOLO’s head is replaced with a decoupled one. For each level of FPN feature, we first adopt a 1 × 1 conv layer to reduce the feature channel to 256 and then add two parallel branches with two 3 × 3 conv layers each for classification and regression tasks respectively.",
      identifier: "yolo_x",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "DETR",
      description:
        "The main ingredients of the new framework, called DEtection TRansformer or DETR, are a set-based global loss that forces unique predictions via bipartite matching, and a transformer encoder-decoder architecture. Given a fixed small set of learned object queries, DETR reasons about the relations of the objects and the global image context to directly output the final set of predictions in parallel.",
      identifier: "detr_r50",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    },
    {
      name: "TOOD",
      description:
        "The proposed Task-aligned One-stage Object Detection (TOOD) explicitly aligns the two sub-tasks of object classification and localization in a learning-based manner to address the issue of spatial misalignment in predictions. This is achieved through the design of a novel Task-aligned Head (T-Head) and the use of Task Alignment Learning (TAL) which pulls the optimal anchors of the two tasks closer together during training via a task-aligned loss and sample assignment scheme.",
      identifier: "tood_r50_fpn",
      createdAt: now,
      requiredDatasetFormat: DatasetFormat.COCO
    }
  ];

  db.collection(CollectionName.NETWORK_ARCHITECTURE).insertMany(networks);
};

const main = async (db: Db) => {
  await Promise.all([createNetworkArchitectures(db)]);

  console.log("FINISHED");
};

mongoClient
  .connect()
  .then((client) => main(client.db(process.env.MONGO_DATABASE_NAME)));
