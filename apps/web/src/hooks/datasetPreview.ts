import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";
import { GetDatasetPreview, getRoute, RouteNames } from "shared-types";


export const useDatasetPreview = (
  id: string
): SWRResponse<GetDatasetPreview> =>
  useSWR(getRoute(RouteNames.GET_DATASET_PREVIEW)(id), () =>
    api.getDatasetPreview(id)
  );
