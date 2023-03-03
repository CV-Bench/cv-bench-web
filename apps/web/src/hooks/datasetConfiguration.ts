import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import {
  RouteNames,
  getRoute,
  GetDatasetConfiguration,
  GetDatasetConfigurationList
} from "shared-types";

export const useDatasetConfiguration = (
  id: string
): SWRResponse<GetDatasetConfiguration> =>
  useSWR(getRoute(RouteNames.GET_DATASET_CONFIGURATION)(id), () =>
    api.getDatasetConfiguration(id)
  );

export const useDatasetConfigurationList =
  (): SWRResponse<GetDatasetConfigurationList> =>
    useSWR(
      getRoute(RouteNames.GET_DATASET_CONFIGURATION_LIST)(),
      api.getDatasetConfigurationList
    );
