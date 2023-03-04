import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import { GetModel, GetModelList, RouteNames, getRoute } from "shared-types";

export const useModel = (id: string): SWRResponse<GetModel> =>
  useSWR(getRoute(RouteNames.GET_MODEL)(id), () => api.getModel(id));

export const useModelList = (ids?: string[]): SWRResponse<GetModelList> =>
  useSWR([getRoute(RouteNames.GET_MODEL_LIST)(), ids], () =>
    api.getModelList(ids)
  );
