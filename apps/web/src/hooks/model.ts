import { api } from "@/network";
import useSWR from "swr";
import { RouteNames, getRoute } from "types";

export const useModel = (id: string | null) =>
  useSWR(id ? getRoute(RouteNames.GET_MODEL)(id) : null, id ? () => api.getModel(id) : null);

export const useModelList = () =>
  useSWR(getRoute(RouteNames.GET_MODEL_LIST)(), api.getModelList);
