import { api } from "@/network";
import useSWR from "swr";
import { RouteNames, getRoute } from "types";

export const useBackground = (id: string) =>
  useSWR(getRoute(RouteNames.GET_MODEL)(id), () => api.getBackground(id));

export const useBackgroundList = () =>
  useSWR(getRoute(RouteNames.GET_MODEL_LIST)(), api.getBackgroundList);
