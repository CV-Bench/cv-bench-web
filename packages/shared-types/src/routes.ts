import * as z from "zod";

import { PatchBackgroundBody, PostBackgroundBody } from "./background";
import { PatchDatasetBody, PostDatasetBody } from "./dataset";
import { PatchModelBody, PostModelBody } from "./model";
import { PatchNetworkBody, PostNetworkBody } from "./network";
import { FinishTaskBody, StopTaskBody } from "./task";

export enum RouteNames {
  GET_MODEL_LIST = "GET_MODEL_LIST",
  GET_MODEL = "GET_MODEL",
  DELETE_MODEL = "DELETE_MODEL",
  PATCH_MODEL = "PATCH_MODEL",
  POST_MODEL = "POST_MODEL",

  GET_BACKGROUND_LIST = "GET_BACKGROUND_LIST",
  GET_BACKGROUND = "GET_BACKGROUND",
  DELETE_BACKGROUND = "DELETE_BACKGROUND",
  POST_BACKGROUND = "POST_BACKGROUND",
  PATCH_BACKGROUND = "PATCH_BACKGROUND",

  GET_DATASET_LIST = "GET_DATASET_LIST",
  GET_DATASET = "GET_DATASET",
  DELETE_DATASET = "DELETE_DATASET",
  PATCH_DATASET = "PATCH_DATASET",
  POST_DATASET = "POST_DATASET",

  GET_DATASET_CONFIGURATION_LIST = "GET_DATASET_CONFIGURATION_LIST",
  GET_DATASET_CONFIGURATION = "GET_DATASET_CONFIGURATION",
  DELETE_DATASET_CONFIGURATION = "DELETE_DATASET_CONFIGURATION",
  PATCH_DATASET_CONFIGURATION = "PATCH_DATASET_CONFIGURATION",
  POST_DATASET_CONFIGURATION = "POST_DATASET_CONFIGURATION",

  GET_DATASET_PREVIEW = "GET_DATASET_PREVIEW",
  POST_DATASET_PREVIEW = "POST_DATASET_PREVIEW",

  GET_NETWORK_LIST = "GET_NETWORK_LIST",
  GET_NETWORK = "GET_NETWORK",
  DELETE_NETWORK = "DELETE_NETWORK",
  PATCH_NETWORK = "PATCH_NETWORK",
  POST_NETWORK = "POST_NETWORK",

  FINISH_TASK = "FINISH_TASK",
  STOP_TASK = "STOP_TASK",
  GET_TASK = "GET_TASK",
  GET_TASK_LIST = "GET_TASK_LIST",

  GET_NETWORK_ARCHITECTURE_LIST = "GET_NETWORK_ARCHITECTURE_LIST",

  GET_NOTIFICATION_LIST = "GET_NOTIFICATION_LIST",
  GET_NOTIFICATION = "GET_NOTIFICATION",
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION",
  READ_NOTIFICATION = "READ_NOTIFICATION"
}

interface RouteType {
  route: string;
  routeRegex: RegExp;
  validator: Zod.AnyZodObject;
  createRoutePath: (id?: string) => string;
}

const createRoute = (
  route: string,
  routeRegex: RegExp,
  validator: Zod.AnyZodObject,
  createRoutePath: (id?: string) => string
): RouteType => ({
  route,
  routeRegex,
  validator,
  createRoutePath
});

export const Routes: {
  [key in RouteNames]: RouteType;
} = {
  [RouteNames.GET_MODEL_LIST]: createRoute(
    "/model",
    /^\/model\/?get$/,
    z.object({}),
    () => "/model"
  ),
  [RouteNames.POST_MODEL]: createRoute(
    "/model",
    /^\/model\/?post$/,
    PostModelBody,
    () => "/model/"
  ),
  [RouteNames.GET_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/model/" + id
  ),
  [RouteNames.DELETE_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/model/" + id
  ),
  [RouteNames.PATCH_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?patch?$/,
    PatchModelBody,
    (id?: string) => "/model/" + id
  ),

  [RouteNames.GET_BACKGROUND_LIST]: createRoute(
    "/background",
    /^\/background\/?get$/,
    z.object({}),
    () => "/background"
  ),
  [RouteNames.GET_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/background/" + id
  ),
  [RouteNames.DELETE_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/background/" + id
  ),
  [RouteNames.PATCH_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?patch?$/,
    PatchBackgroundBody,
    (id?: string) => "/background/" + id
  ),
  [RouteNames.POST_BACKGROUND]: createRoute(
    "/background",
    /^\/background\/?post$/,
    PostBackgroundBody,
    () => "/background/"
  ),

  [RouteNames.GET_DATASET_LIST]: createRoute(
    "/dataset",
    /^\/dataset\/?get$/,
    z.object({}),
    () => "/dataset"
  ),
  [RouteNames.GET_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/dataset/" + id
  ),
  [RouteNames.DELETE_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/dataset/" + id
  ),
  [RouteNames.PATCH_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?patch?$/,
    PatchDatasetBody,
    (id?: string) => "/dataset/" + id
  ),
  [RouteNames.POST_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?post$/,
    PostDatasetBody,
    (id?: string) => "/dataset/" + id
  ),

  [RouteNames.GET_DATASET_CONFIGURATION_LIST]: createRoute(
    "/datasetConfiguration",
    /^\/datasetConfiguration\/?get$/,
    z.object({}),
    () => "/datasetConfiguration"
  ),
  [RouteNames.GET_DATASET_CONFIGURATION]: createRoute(
    "/datasetConfiguration/:id",
    /^\/datasetConfiguration\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/datasetConfiguration/" + id
  ),
  [RouteNames.DELETE_DATASET_CONFIGURATION]: createRoute(
    "/datasetConfiguration/:id",
    /^\/datasetConfiguration\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/datasetConfiguration/" + id
  ),
  [RouteNames.PATCH_DATASET_CONFIGURATION]: createRoute(
    "/datasetConfiguration/:id",
    /^\/datasetConfiguration\/.*\/?patch?$/,
    z.object({}),
    (id?: string) => "/datasetConfiguration/" + id
  ),
  [RouteNames.POST_DATASET_CONFIGURATION]: createRoute(
    "/datasetConfiguration/:id",
    /^\/datasetConfiguration\/.*\/?post$/,
    z.object({}),
    (id?: string) => "/datasetConfiguration/" + id
  ),

  [RouteNames.GET_DATASET_PREVIEW]: createRoute(
    "/datasetPreview/:id",
    /^\/datasetPreview\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/datasetPreview/" + id
  ),
  [RouteNames.POST_DATASET_PREVIEW]: createRoute(
    "/datasetPreview",
    /^\/datasetPreview\/?post$/,
    PostDatasetBody,
    () => "/datasetPreview/"
  ),

  [RouteNames.GET_NETWORK_LIST]: createRoute(
    "/network",
    /^\/network\/?get$/,
    z.object({}),
    () => "/network"
  ),
  [RouteNames.GET_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/network/" + id
  ),
  [RouteNames.DELETE_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/network/" + id
  ),
  [RouteNames.PATCH_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?patch?$/,
    PatchNetworkBody,
    (id?: string) => "/network/" + id
  ),
  [RouteNames.POST_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?post$/,
    PostNetworkBody,
    (id?: string) => "/network/" + id
  ),

  [RouteNames.GET_TASK]: createRoute(
    "/task/:id",
    /^\/task\/.*\/?get$/,
    z.object({}),
    (id?: string) => "/task/" + id
  ),
  [RouteNames.GET_TASK_LIST]: createRoute(
    "/task",
    /^\/task\/?get$/,
    z.object({}),
    () => "/task"
  ),
  [RouteNames.FINISH_TASK]: createRoute(
    "/task/finish/:id",
    /^\/task\/finish\/.*\/?post$/,
    FinishTaskBody,
    (id?: string) => "/task" + id
  ),
  [RouteNames.STOP_TASK]: createRoute(
    "/task/stop/:id",
    /^\/task\/stop\/.*\/?post$/,
    StopTaskBody,
    (id?: string) => "/task/" + id
  ),

  [RouteNames.GET_NETWORK_ARCHITECTURE_LIST]: createRoute(
    "/networkArchitecture",
    /^\/networkArchitecture\/?get$/,
    z.object({}),
    () => "/networkArchitecture"
  ),

  [RouteNames.GET_NOTIFICATION_LIST]: createRoute(
    "/notification",
    /^\/notification\/?get$/,
    z.object({}),
    () => "/notification"
  ),
  [RouteNames.GET_NOTIFICATION]: createRoute(
    "/notification/:id",
    /^\/notification\/.*\/?get?$/,
    z.object({}),
    (id?: string) => "/notification/" + id
  ),
  [RouteNames.DELETE_NOTIFICATION]: createRoute(
    "/notification/:id",
    /^\/notification\/.*\/?delete?$/,
    z.object({}),
    (id?: string) => "/notification/" + id
  ),
  [RouteNames.READ_NOTIFICATION]: createRoute(
    "/notification/:id",
    /^\/notification\/.*\/?patch?$/,
    z.object({}),
    (id?: string) => "/notification/" + id
  )
};

export const findRouteValidator = (currentRoute: string) =>
  Object.values(Routes).find(({ routeRegex }) =>
    currentRoute.toLowerCase().match(routeRegex)
  );

export const route = (routeName: RouteNames) => Routes[routeName].route;
export const getRoute = (routeName: RouteNames) =>
  Routes[routeName].createRoutePath;
