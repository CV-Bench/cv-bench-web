import * as z from "zod";
import { PostModelBody } from "./model";
import { PostDatasetBody } from "./dataset";
import { PostNetworkBody } from "./network";

export enum RouteNames {
  GET_MODELS = "GET_MODELS",
  GET_MODEL = "GET_MODEL",
  GET_MODEL_OBJ = "GET_MODEL_OBJ",
  DELETE_MODEL = "DELETE_MODEL",
  PATCH_MODEL = "PATCH_MODEL",
  POST_MODEL = "POST_MODEL",
  DOWNLOAD_MODEL = "DOWNLOAD_MODEL",

  GET_BACKGROUNDS = "GET_BACKGROUNDS",
  GET_BACKGROUND = "GET_BACKGROUND",
  DELETE_BACKGROUND = "DELETE_BACKGROUND",
  POST_BACKGROUND = "POST_BACKGROUND",
  PATCH_BACKGROUND = "PATCH_BACKGROUND",
  DOWNLOAD_BACKGROUND = "DOWNLOAD_BACKGROUND",

  GET_DATASETS = "GET_DATASETS",
  GET_DATASET = "GET_DATASET",
  DELETE_DATASET = "DELETE_DATASET",
  PATCH_DATASET = "PATCH_DATASET",
  POST_DATASET = "POST_DATASET",

  GET_NETWORKS = "GET_NETWORKS",
  GET_NETWORK = "GET_NETWORK",
  DELETE_NETWORK = "DELETE_NETWORK",
  PATCH_NETWORK = "PATCH_NETWORK",
  POST_NETWORK = "POST_NETWORK",
}

interface RouteType {
  route: string;
  routeRegex: RegExp;
  validator: Zod.AnyZodObject;
  createRoutePath: (() => string) | ((id: string) => string);
}

const createRoute = (
  route: string,
  routeRegex: RegExp,
  validator: Zod.AnyZodObject,
  createRoutePath: (() => string) | ((id: string) => string)
): RouteType => ({
  route,
  routeRegex,
  validator,
  createRoutePath,
});

export const Routes: {
  [key in RouteNames]: RouteType;
} = {
  [RouteNames.GET_MODELS]: createRoute(
    "/model",
    /^\/model\/?get$/,
    z.object({}),
    () => "/model"
  ),
  [RouteNames.GET_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?get?$/,
    z.object({}),
    (id: string) => "/model/" + id
  ),
  [RouteNames.GET_MODEL_OBJ]: createRoute(
    "/modelObject/:id",
    /^\/modelObject\/.*\/?get$/,
    z.object({}),
    (id: string) => "/modelObject/" + id
  ),
  [RouteNames.DELETE_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?delete?$/,
    z.object({}),
    (id: string) => "/model/" + id
  ),
  [RouteNames.PATCH_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?patch?$/,
    z.object({}),
    (id: string) => "/model/" + id
  ),
  [RouteNames.POST_MODEL]: createRoute(
    "/model/:id",
    /^\/model\/.*\/?post$/,
    PostModelBody,
    (id: string) => "/model/" + id
  ),
  [RouteNames.DOWNLOAD_MODEL]: createRoute(
    "/model/download/:id",
    /^\/model\/download\/.*\/?get$/,
    z.object({}),
    (id: string) => "/model/download/" + id
  ),

  [RouteNames.GET_BACKGROUNDS]: createRoute(
    "/background",
    /^\/background\/?get$/,
    z.object({}),
    () => "/background"
  ),
  [RouteNames.GET_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?get?$/,
    z.object({}),
    (id: string) => "/background/" + id
  ),
  [RouteNames.GET_BACKGROUND]: createRoute(
    "/backgroundObject/:id",
    /^\/backgroundObject\/.*\/?get$/,
    z.object({}),
    (id: string) => "/backgroundObject/" + id
  ),
  [RouteNames.DELETE_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?delete?$/,
    z.object({}),
    (id: string) => "/background/" + id
  ),
  [RouteNames.PATCH_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?patch?$/,
    z.object({}),
    (id: string) => "/background/" + id
  ),
  [RouteNames.POST_BACKGROUND]: createRoute(
    "/background/:id",
    /^\/background\/.*\/?post$/,
    PostModelBody,
    (id: string) => "/background/" + id
  ),
  [RouteNames.DOWNLOAD_BACKGROUND]: createRoute(
    "/background/download/:id",
    /^\/background\/download\/.*\/?get$/,
    z.object({}),
    (id: string) => "/background/download/" + id
  ),

  [RouteNames.GET_DATASETS]: createRoute(
    "/dataset",
    /^\/dataset\/?get$/,
    z.object({}),
    () => "/dataset"
  ),
  [RouteNames.GET_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?get?$/,
    z.object({}),
    (id: string) => "/dataset/" + id
  ),
  [RouteNames.DELETE_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?delete?$/,
    z.object({}),
    (id: string) => "/dataset/" + id
  ),
  [RouteNames.PATCH_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?patch?$/,
    z.object({}),
    (id: string) => "/dataset/" + id
  ),
  [RouteNames.POST_DATASET]: createRoute(
    "/dataset/:id",
    /^\/dataset\/.*\/?post$/,
    PostDatasetBody,
    (id: string) => "/dataset/" + id
  ),

  [RouteNames.GET_NETWORKS]: createRoute(
    "/network",
    /^\/network\/?get$/,
    z.object({}),
    () => "/network"
  ),
  [RouteNames.GET_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?get?$/,
    z.object({}),
    (id: string) => "/network/" + id
  ),
  [RouteNames.DELETE_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?delete?$/,
    z.object({}),
    (id: string) => "/network/" + id
  ),
  [RouteNames.PATCH_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?patch?$/,
    z.object({}),
    (id: string) => "/network/" + id
  ),
  [RouteNames.POST_NETWORK]: createRoute(
    "/network/:id",
    /^\/network\/.*\/?post$/,
    PostNetworkBody,
    (id: string) => "/network/" + id
  ),
};

export const findRouteValidator = (currentRoute: string) =>
  Object.values(Routes).find(({ route }) =>
    currentRoute.toLowerCase().match(route)
  );

export const route = (routeName: RouteNames) => Routes[routeName].route;
