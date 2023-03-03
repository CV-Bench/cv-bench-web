import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import { GetDataset, GetDatasetList, RouteNames, getRoute, GetDatasetConfiguration, GetDatasetConfigurationList } from "shared-types";

export const useDatasetConfigurations = (id: string): SWRResponse<GetDatasetConfiguration> =>
  useSWR(getRoute(RouteNames.GET_DATASET_CONFIGURATION)(id), () => api.getDatasetConfiguration(id));

export const useDatasetList = (): SWRResponse<GetDatasetConfigurationList> =>
  useSWR(getRoute(RouteNames.GET_DATASET_CONFIGURATION_LIST)(), api.getDatasetConfigurationList);
