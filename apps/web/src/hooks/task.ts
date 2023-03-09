import useSWR, { SWRResponse } from "swr";

import { api } from "@/network";

import {
  GetTask,
  GetTaskList,
  RouteNames,
  TaskLogUpdateData,
  getRoute
} from "shared-types";

export const useTask = (id: string): SWRResponse<GetTask> =>
  useSWR(getRoute(RouteNames.GET_TASK)(id), () => api.getTask(id));

export const useTaskList = (): SWRResponse<GetTaskList> =>
  useSWR(getRoute(RouteNames.GET_TASK_LIST)(), api.getTaskList);

export const useTaskLog = (id: string): SWRResponse<TaskLogUpdateData> =>
  useSWR(getRoute(RouteNames.GET_TASK_LOG)(id), () => api.getTaskLog(id));
