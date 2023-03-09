import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import { GetTask, GetTaskList, RouteNames, getRoute } from "shared-types";

export const useTask = (id: string): SWRResponse<GetTask> =>
  useSWR(getRoute(RouteNames.GET_TASK)(id), () => api.getTask(id));

export const useTaskList = (): SWRResponse<GetTaskList> =>
  useSWR(getRoute(RouteNames.GET_TASK_LIST)(), api.getTaskList);
