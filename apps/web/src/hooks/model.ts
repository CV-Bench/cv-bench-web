import { api } from "@/network";
import useSWR from "swr";
import { RouteNames, getRoute } from "types";

export const useModel = (id: string) =>
  useSWR(getRoute(RouteNames.GET_MODEL)(id), () => api.getModel(id));

export const useModelList = () =>
  useSWR(getRoute(RouteNames.GET_MODEL_LIST)(), api.getModelList);
