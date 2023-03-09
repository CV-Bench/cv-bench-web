import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import {
  GetNetwork,
  GetNetworkArchitectureList,
  GetNetworkList,
  GetNetworkPreviewList,
  RouteNames,
  getRoute
} from "shared-types";

export const useNetwork = (id: string): SWRResponse<GetNetwork> =>
  useSWR(getRoute(RouteNames.GET_NETWORK)(id), () => api.getNetwork(id));

export const useNetworkList = (): SWRResponse<GetNetworkList> =>
  useSWR(getRoute(RouteNames.GET_NETWORK_LIST)(), api.getNetworkList);

export const useNetworkArchitectureList =
  (): SWRResponse<GetNetworkArchitectureList> =>
    useSWR(
      getRoute(RouteNames.GET_NETWORK_ARCHITECTURE_LIST)(),
      api.getNetworkArchitectureList
    );

export const useNetworkPreviews = (
  id: string
): SWRResponse<GetNetworkPreviewList> =>
  useSWR(getRoute(RouteNames.GET_DATASET_PREVIEW_LIST)(id), () =>
    api.getNetworkPreviewList(id)
  );
