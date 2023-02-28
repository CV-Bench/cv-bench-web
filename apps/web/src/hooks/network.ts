import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import {
  GetNetwork,
  GetNetworkArchitectureList,
  GetNetworkList,
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
