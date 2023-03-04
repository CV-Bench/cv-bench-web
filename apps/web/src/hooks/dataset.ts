import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import { GetDataset, GetDatasetList, RouteNames, getRoute } from "shared-types";

export const useDataset = (id: string): SWRResponse<GetDataset> =>
  useSWR(getRoute(RouteNames.GET_DATASET)(id), () => api.getDataset(id));

export const useDatasetList = (): SWRResponse<GetDatasetList> =>
  useSWR(getRoute(RouteNames.GET_DATASET_LIST)(), api.getDatasetList);
