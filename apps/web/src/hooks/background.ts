import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import { GetBackground, GetBackgroundList, RouteNames, getRoute } from "types";

export const useBackground = (id: string): SWRResponse<GetBackground> =>
  useSWR(getRoute(RouteNames.GET_MODEL)(id), () => api.getBackground(id));

export const useBackgroundList = (): SWRResponse<GetBackgroundList> =>
  useSWR(getRoute(RouteNames.GET_MODEL_LIST)(), api.getBackgroundList);
