"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AccessType: () => AccessType,
  AuditEventBody: () => AuditEventBody,
  AuditEventType: () => AuditEventType,
  BlenderConfigurationObject: () => BlenderConfigurationObject,
  CamLensUnit: () => CamLensUnit,
  ConfigurationType: () => ConfigurationType,
  DataType: () => DataType,
  DatasetBody: () => DatasetBody,
  DatasetConfigurationBody: () => DatasetConfigurationBody,
  DatasetFormat: () => DatasetFormat,
  DatasetType: () => DatasetType,
  ModelBody: () => ModelBody,
  ModelType: () => ModelType,
  NetworkArchitectureBody: () => NetworkArchitectureBody,
  NetworkBody: () => NetworkBody,
  NotificationBody: () => NotificationBody,
  NotificationType: () => NotificationType,
  PostDatasetBody: () => PostDatasetBody,
  PostDatasetConfigurationBody: () => PostDatasetConfigurationBody,
  PostModelBody: () => PostModelBody,
  PostNetworkBody: () => PostNetworkBody,
  PostTaskBody: () => PostTaskBody,
  RandomColor: () => RandomColor,
  TaskBody: () => TaskBody,
  TaskStatus: () => TaskStatus,
  TaskType: () => TaskType
});
module.exports = __toCommonJS(src_exports);
var z8 = __toESM(require("zod"));

// src/utils.ts
var z = __toESM(require("zod"));
var ObjId = z.any();
var DataBody = z.object({
  _id: ObjId,
  userId: ObjId,
  name: z.string(),
  description: z.string(),
  domainTags: z.array(z.string()),
  accessType: z.nativeEnum(AccessType),
  createdAt: z.date(),
  updatedAt: z.date()
});
var PostDataBody = DataBody.pick({
  name: true,
  description: true,
  accessType: true
});

// src/model.ts
var z2 = __toESM(require("zod"));
var ModelType = /* @__PURE__ */ ((ModelType2) => {
  ModelType2[ModelType2["3D"] = 0] = "3D";
  ModelType2[ModelType2["2D"] = 1] = "2D";
  return ModelType2;
})(ModelType || {});
var ModelBody = DataBody.extend({
  modelType: z2.nativeEnum(ModelType)
});
var PostModelBody = PostDataBody.extend({
  modelType: z2.nativeEnum(ModelType)
  // TODO: extend with necessary data to upload .obj and .ply
});

// src/dataset.ts
var z3 = __toESM(require("zod"));
var DatasetType = /* @__PURE__ */ ((DatasetType2) => {
  DatasetType2[DatasetType2["BLENDER_3D"] = 0] = "BLENDER_3D";
  return DatasetType2;
})(DatasetType || {});
var DatasetBody = DataBody.extend({
  models: z3.array(ObjId),
  datasetType: z3.nativeEnum(DatasetType),
  configurationId: ObjId
});
var PostDatasetBody = PostDataBody.merge(
  DatasetBody.pick({ models: true, datasetType: true, configurationId: true })
);

// src/datasetConfiguration.ts
var z4 = __toESM(require("zod"));
var ConfigurationType = /* @__PURE__ */ ((ConfigurationType2) => {
  ConfigurationType2[ConfigurationType2["BLENDER"] = 0] = "BLENDER";
  return ConfigurationType2;
})(ConfigurationType || {});
var RandomColor = /* @__PURE__ */ ((RandomColor2) => {
  RandomColor2["NONE"] = "None";
  RandomColor2["TEMPERATURE"] = "Temperature";
  RandomColor2["PROJECTOR"] = "Projector";
  return RandomColor2;
})(RandomColor || {});
var CamLensUnit = /* @__PURE__ */ ((CamLensUnit2) => {
  CamLensUnit2["FOV"] = "FOV";
  CamLensUnit2["MILLIMETERS"] = "MILLIMETERS";
  return CamLensUnit2;
})(CamLensUnit || {});
var BlenderConfigurationObject = z4.object({
  maxDistractorObjects: z4.number().int().gte(0),
  //max number of distractor objects
  numberOfObjects: z4.number().int().gte(0).default(1),
  //number of target objects
  // DEPTH OUTPUT (not tested)
  outputDepth: z4.boolean().default(false),
  depthOutputDepth: z4.number().int().default(16),
  // AUGMENTATION
  // emission_min: z.number().default(1), // only for environment maps
  // emission_max: z.number().default(8), // only for environment maps
  // light_number_min: z.number().default(1), // only for background images
  // light_number_max: z.number().default(3), // only for background images
  // light_energymin: z.number().default(20), // only for background images
  // light_energymax: z.number().default(80), // only for background images
  randomHSVValue: z4.boolean().default(false),
  // randomize the value of HSV color space of the object with p=0.5
  randomMetallicValue: z4.boolean().default(false),
  //randomize the metallic object value with p=0.5
  randomRoughnessValue: z4.boolean().default(false),
  //randomize the roughness object value with p=0.5
  random_color: z4.nativeEnum(RandomColor),
  //choose "None", "temperature", "projector"
  // OBJECT COLOR (for PLY Files)
  modelScale: z4.number().gt(0).default(1),
  // model scale for PLY objects
  hsv_hue: z4.number().gte(0).lte(1).default(0.5),
  // changes hue of Hue Saturation Value Node, default 0.5
  hsv_saturation: z4.number().gte(0).lte(1).default(1),
  // changes saturation of Hue Saturation Value Node, default 1
  hsv_value: z4.number().gte(0).lte(1).default(1),
  // 0.35 // changes value of Hue Saturation Value Node, default 1
  //roughness: z.number().gte(0).lte(1).default(0.3) //0.1 # Object Material Roughness (0=Mirror, 1=No Reflections)
  // camera sphere coordinates
  camRMin: z4.number().default(0.3),
  // minimum camera distance
  camRMax: z4.number().default(1.1),
  // maximum camera distance
  camIncMin: z4.number().default(0),
  camIncMax: z4.number().default(Math.PI / 2),
  // pi*2/3
  camAziMin: z4.number().default(0),
  camAziMax: z4.number().default(2 * Math.PI),
  //  OBJECT POSITION
  objLocationXMin: z4.number().default(-0.2),
  // translation in meters
  objLocationXMax: z4.number().default(0.2),
  objLocationYMin: z4.number().default(-0.2),
  objLocationYMax: z4.number().default(0.2),
  objLocationZMin: z4.number().default(-0.2),
  objLocationZMax: z4.number().default(0.2),
  camRotationMin: z4.number().default(0),
  camRotationMax: z4.number().default(2 * Math.PI),
  maxBoundingBox: z4.number().gte(0).lte(1).default(0.1),
  // filter out objects with bbox < -x or > 1+x (a value of 0.1 means max. 10% occlusion)
  // Camera
  camLensUnit: z4.nativeEnum(CamLensUnit),
  // Choose 'FOV' or 'MILLIMETERS'
  camLens: z4.number().default(4.7),
  // Camera lens value in mm
  camFov: z4.number().default((59 + 90) / 2),
  // camera field of view in degrees
  camSensorHeight: z4.number().gt(0).default(3.84),
  // mm
  camSensorWidth: z4.number().gt(0).default(5.11),
  // mm
  clipEnd: z4.number().default(50),
  clipStart: z4.number().default(0.01),
  //  RENDERING CONFIG
  useGPU: z4.boolean().default(true),
  useCycles: z4.boolean().default(true),
  // cycles or eevee
  useCyclesDenoising: z4.boolean().default(false),
  useAdaptiveSampling: z4.boolean().default(true),
  resolutionX: z4.number().gt(0).default(640),
  // pixel resolution
  resolutionY: z4.number().gt(0).default(360),
  // pixel resolution
  samples: z4.number().gt(0).default(512),
  //  OUTPUT
  numberOfRenders: z4.number().default(20)
  // how many rendered examples
});
var DatasetConfigurationBody = z4.object({
  _id: ObjId,
  userId: ObjId,
  name: z4.string(),
  createdAt: z4.string(),
  configurationType: z4.nativeEnum(ConfigurationType),
  configuration: BlenderConfigurationObject
});
var PostDatasetConfigurationBody = DatasetConfigurationBody.pick({
  name: true,
  configurationType: true,
  configuration: true
});

// src/audit.ts
var z5 = __toESM(require("zod"));
var AuditEventType = /* @__PURE__ */ ((AuditEventType2) => {
  AuditEventType2["LOG_IN_USER"] = "LOG_IN_USER";
  AuditEventType2["CREATE_USER"] = "CREATE_USER";
  AuditEventType2["CREATE_MODEL"] = "CREATE_MODEL";
  AuditEventType2["UPDATE_MODEL"] = "UPDATE_MODEL";
  AuditEventType2["DELETE_MODEL"] = "DELETE_MODEL";
  AuditEventType2["DOWNLOAD_MODEL"] = "DOWNLOAD_MODEL";
  AuditEventType2["REQUEST_MODEL_DOWNLOAD"] = "REQUEST_MODEL_DOWNLOAD";
  AuditEventType2["DATASET_CREATED"] = "DATASET_CREATED";
  AuditEventType2["CREATE_DATASET"] = "CREATE_DATASET";
  AuditEventType2["UPDATE_DATASET"] = "UPDATE_DATASET";
  AuditEventType2["DELETE_DATASET"] = "DELETE_DATASET";
  AuditEventType2["DOWNLOAD_DATASET"] = "DOWNLOAD_DATASET";
  AuditEventType2["REQUEST_DATASET_DOWNLOAD"] = "REQUEST_DATASET_DOWNLOAD";
  AuditEventType2["NETWORK_TRAINED"] = "NETWORK_TRAINED";
  AuditEventType2["TRAING_NETWORK"] = "TRAING_NETWORK";
  AuditEventType2["CREATE_NETWORK"] = "CREATE_NETWORK";
  AuditEventType2["UPDATE_NETWORK"] = "UPDATE_NETWORK";
  AuditEventType2["DELETE_NETWORK"] = "DELETE_NETWORK";
  AuditEventType2["DOWNLOAD_NETWORK"] = "DOWNLOAD_NETWORK";
  AuditEventType2["REQUEST_NETWORK_DOWNLOAD"] = "REQUEST_NETWORK_DOWNLOAD";
  AuditEventType2["STOP_TASK"] = "STOP_TASK";
  return AuditEventType2;
})(AuditEventType || {});
var AuditEventBody = z5.object({
  _id: ObjId,
  userId: ObjId.optional(),
  type: z5.nativeEnum(AuditEventType),
  createdAt: z5.date()
});

// src/network.ts
var NetworkBody = DataBody.extend({
  datasetId: ObjId,
  networkArchitectureId: ObjId
});
var PostNetworkBody = PostDataBody.merge(
  NetworkBody.pick({ datasetId: true, networkArchitectureId: true })
);

// src/notification.ts
var z6 = __toESM(require("zod"));
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
})(NotificationType || {});
var NotificationBody = z6.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z6.date(),
  updatedAt: z6.date(),
  isRead: z6.boolean(),
  description: z6.string(),
  title: z6.string(),
  type: z6.nativeEnum(NotificationType)
});

// src/task.ts
var z7 = __toESM(require("zod"));
var TaskStatus = /* @__PURE__ */ ((TaskStatus2) => {
  TaskStatus2["PENDING"] = "PENDING";
  TaskStatus2["RUNNING"] = "RUNNING";
  TaskStatus2["ABORTED"] = "ABORTED";
  TaskStatus2["FINISHED"] = "FINISHED";
  return TaskStatus2;
})(TaskStatus || {});
var TaskType = /* @__PURE__ */ ((TaskType2) => {
  TaskType2["CREATE_NETWORK"] = "CREATE_NETWORK";
  TaskType2["CREATE_DATASET"] = "CREATE_DATASET";
  return TaskType2;
})(TaskType || {});
var TaskBody = z7.object({
  _id: ObjId,
  userId: ObjId,
  createdAt: z7.date(),
  updatedAt: z7.date(),
  status: z7.nativeEnum(TaskStatus),
  type: z7.nativeEnum(TaskType),
  info: z7.object({
    modelId: ObjId.optional(),
    datasetId: ObjId.optional(),
    networkArchitectureId: ObjId.optional()
  })
});
var PostTaskBody = TaskBody.pick({
  type: true,
  info: true
});

// src/index.ts
var AccessType = /* @__PURE__ */ ((AccessType2) => {
  AccessType2["PUBLIC"] = "PUBLIC";
  AccessType2["PRIVATE"] = "PRIVATE";
  return AccessType2;
})(AccessType || {});
var DataType = /* @__PURE__ */ ((DataType2) => {
  DataType2["MODEL"] = "MODEL";
  DataType2["DATASET"] = "DATASET";
  DataType2["NETWORK"] = "NETWORK";
  return DataType2;
})(DataType || {});
var DatasetFormat = /* @__PURE__ */ ((DatasetFormat2) => {
  DatasetFormat2["COCO"] = "COCO";
  return DatasetFormat2;
})(DatasetFormat || {});
var NetworkArchitectureBody = z8.object({
  _id: ObjId,
  name: z8.string(),
  identifier: z8.string(),
  description: z8.string(),
  createdAt: z8.date(),
  requiredDatasetFormat: z8.nativeEnum(DatasetFormat)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessType,
  AuditEventBody,
  AuditEventType,
  BlenderConfigurationObject,
  CamLensUnit,
  ConfigurationType,
  DataType,
  DatasetBody,
  DatasetConfigurationBody,
  DatasetFormat,
  DatasetType,
  ModelBody,
  ModelType,
  NetworkArchitectureBody,
  NetworkBody,
  NotificationBody,
  NotificationType,
  PostDatasetBody,
  PostDatasetConfigurationBody,
  PostModelBody,
  PostNetworkBody,
  PostTaskBody,
  RandomColor,
  TaskBody,
  TaskStatus,
  TaskType
});
