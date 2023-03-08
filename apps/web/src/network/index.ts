/*  */
import {
  GetBackground,
  GetBackgroundBody,
  GetBackgroundList,
  GetBackgroundListBody,
  GetDataset,
  GetDatasetBody,
  GetDatasetList,
  GetDatasetListBody,
  GetModel,
  GetModelBody,
  GetModelList,
  GetModelListBody,
  GetNetwork,
  GetNetworkArchitectureList,
  GetNetworkArchitectureListBody,
  GetNetworkBody,
  GetNetworkList,
  GetNetworkListBody,
  GetTask,
  GetTaskBody,
  GetTaskList,
  GetTaskListBody,
  PatchBackground,
  PatchDataset,
  PatchModel,
  PatchNetwork,
  PostBackground,
  PostBackgroundResponse,
  PostBackgroundResponseBody,
  PostDataset,
  PostModel,
  PostModelResponse,
  PostModelResponseBody,
  PostNetwork,
  RouteNames,
  getRoute,
  GetNotification,
  GetNotificationBody,
  GetNotificationList,
  GetNotificationListBody,
  GetDatasetConfiguration,
  GetDatasetConfigurationList,
  GetDatasetConfigurationListBody,
  GetDatasetConfigurationBody,
  PostDatasetConfiguration,
  PatchDatasetConfiguration,
  PostDatasetResponse,
  PostDatasetResponseBody,
  PostNetworkResponse,
  GetDatasetPreviewListBody
} from "shared-types";

import { network } from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_HOST_DOMAIN || "http://localhost:3001";

const fetchCors = (url: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(url, {
    ...init,
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });

const createMethod =
  (method: string) =>
  async <T, B = any>(
    url: RequestInfo | URL,
    init?:
      | (Omit<RequestInit, "body"> & { body: T } & {
          throwError?: boolean;
        })
      | undefined
  ) => {
    const response = await fetchCors(baseUrl + url, {
      ...init,
      ...(init && init.body
        ? { body: JSON.stringify(init.body) }
        : { body: null }),
      method
    });

    network.checkResponse(response, init?.throwError || true);

    return response.json() as Promise<B>;
  };

const postRequest = createMethod("POST");
const deleteRequest = createMethod("DELETE");
const getRequest = createMethod("GET");
const patchRequest = createMethod("PATCH");

export const api = {
  fetchWithAuthentication: async <Type>(url: string) => {
    const response = await fetchCors(url);

    const { data } = await response.json();

    return data as Type;
  },

  // MODEL
  getModel: async (id: string): Promise<GetModel> => {
    const model = await getRequest(getRoute(RouteNames.GET_MODEL)(id));

    return GetModelBody.parse(model);
  },
  getModelList: async (ids?: string[]): Promise<GetModelList> => {
    const idsParam = ids ? `?ids=${ids.join(",")}` : "";
    const models = await getRequest(
      getRoute(RouteNames.GET_MODEL_LIST)() + idsParam
    );

    return GetModelListBody.parse(models);
  },
  postModel: async (body: PostModel): Promise<PostModelResponse> => {
    const response = await postRequest(getRoute(RouteNames.POST_MODEL)(), {
      body
    });

    return PostModelResponseBody.parse(response);
  },
  deleteModel: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_MODEL)(id)),
  patchModel: async (id: string, body: PatchModel) =>
    patchRequest(getRoute(RouteNames.PATCH_MODEL)(id), { body }),

  // BACKGROUND
  getBackground: async (id: string): Promise<GetBackground> => {
    const background = await getRequest(
      getRoute(RouteNames.GET_BACKGROUND)(id)
    );

    return GetBackgroundBody.parse(background);
  },
  getBackgroundList: async (
    domainTags?: string[],
    ids?: string[]
  ): Promise<GetBackgroundList> => {
    const idsParam = ids ? `?ids=${ids.join(",")}` : "";
    const tagParam =
      !idsParam && domainTags ? `?domainTags=${domainTags.join(",")}` : "";
    const backgrounds = await getRequest(
      getRoute(RouteNames.GET_BACKGROUND_LIST)() + tagParam + idsParam
    );

    return GetBackgroundListBody.parse(backgrounds) as GetBackgroundList;
  },
  postBackgrounds: async (
    body: PostBackground
  ): Promise<PostBackgroundResponse> => {
    const response = await postRequest(getRoute(RouteNames.POST_BACKGROUND)(), {
      body
    });

    return PostBackgroundResponseBody.parse(response);
  },
  deleteBackground: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_BACKGROUND)(id)),
  patchBackground: async (id: string, body: PatchBackground) =>
    patchRequest(getRoute(RouteNames.PATCH_BACKGROUND)(id), { body }),

  // DATASET
  getDataset: async (id: string): Promise<GetDataset> => {
    const background = await getRequest(getRoute(RouteNames.GET_DATASET)(id));

    return GetDatasetBody.parse(background);
  },
  getDatasetList: async (): Promise<GetDatasetList> => {
    const backgrounds = await getRequest(
      getRoute(RouteNames.GET_DATASET_LIST)()
    );

    return GetDatasetListBody.parse(backgrounds) as GetDatasetList;
  },
  postDatasets: async (body: PostDataset): Promise<PostDatasetResponse> => {
    const response = await postRequest(getRoute(RouteNames.POST_DATASET)(), {
      body
    });

    return PostDatasetResponseBody.parse(response);
  },
  deleteDataset: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_DATASET)(id)),
  patchDataset: async (id: string, body: PatchDataset) =>
    patchRequest(getRoute(RouteNames.PATCH_DATASET)(id), { body }),

  // DATASET CONFIGURATION
  getDatasetConfiguration: async (
    id: string
  ): Promise<GetDatasetConfiguration> => {
    const datasetConfiguration = await getRequest(
      getRoute(RouteNames.GET_DATASET_CONFIGURATION)(id)
    );

    return GetDatasetConfigurationBody.parse(datasetConfiguration);
  },
  getDatasetConfigurationList:
    async (): Promise<GetDatasetConfigurationList> => {
      const datasetConfigurations = await getRequest(
        getRoute(RouteNames.GET_DATASET_CONFIGURATION_LIST)()
      );

      return GetDatasetConfigurationListBody.parse(
        datasetConfigurations
      ) as GetDatasetConfigurationList;
    },
  postDatasetConfiguration: async (
    body: PostDatasetConfiguration
  ): Promise<string> =>
    postRequest(getRoute(RouteNames.POST_DATASET_CONFIGURATION)(), { body }),
  deleteDatasetConfiguration: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_DATASET_CONFIGURATION)(id)),
  patchDatasetConfiguration: async (
    id: string,
    body: PatchDatasetConfiguration
  ) =>
    patchRequest(getRoute(RouteNames.PATCH_DATASET_CONFIGURATION)(id), {
      body
    }),

  // NETWORK
  getNetwork: async (id: string): Promise<GetNetwork> => {
    const background = await getRequest(getRoute(RouteNames.GET_NETWORK)(id));
    return GetNetworkBody.parse(background);
  },
  getNetworkList: async (): Promise<GetNetworkList> => {
    const network = await getRequest(getRoute(RouteNames.GET_NETWORK_LIST)());

    return GetNetworkListBody.parse(network) as GetNetworkList;
  },
  postNetworks: async (body: PostNetwork): Promise<PostNetworkResponse> =>
    postRequest(getRoute(RouteNames.POST_NETWORK)(), { body }),
  deleteNetwork: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_NETWORK)(id)),
  patchNetwork: async (id: string, body: PatchNetwork) =>
    patchRequest(getRoute(RouteNames.PATCH_NETWORK)(id), { body }),

  // TASK
  getTask: async (id: string): Promise<GetTask> => {
    const task = await getRequest(getRoute(RouteNames.GET_TASK)(id));

    console.log("TASK", task);

    return GetTaskBody.parse(task);
  },
  getTaskList: async (): Promise<GetTaskList> => {
    const tasks = await getRequest(getRoute(RouteNames.GET_TASK_LIST)());

    return GetTaskListBody.parse(tasks) as GetTaskList;
  },
  stopTask: (id: string) => postRequest(getRoute(RouteNames.STOP_TASK)(id)),

  // NETWORK ARCHITECTURE
  getNetworkArchitectureList: async () => {
    const networkArchitectures = await getRequest(
      getRoute(RouteNames.GET_NETWORK_ARCHITECTURE_LIST)()
    );

    return GetNetworkArchitectureListBody.parse(
      networkArchitectures
    ) as GetNetworkArchitectureList;
  },

  // NOTIFICATION
  getNotification: async (id: string): Promise<GetNotification> => {
    const notification = await getRequest(
      getRoute(RouteNames.GET_NOTIFICATION)(id)
    );

    return GetNotificationBody.parse(notification);
  },
  getNotificationList: async (): Promise<GetNotificationList> => {
    const notifications = await getRequest(
      getRoute(RouteNames.GET_NOTIFICATION_LIST)()
    );

    return GetNotificationListBody.parse(notifications) as GetNotificationList;
  },
  deleteNotification: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_NOTIFICATION)(id)),
  readNotification: (id: string) =>
    patchRequest(getRoute(RouteNames.READ_NOTIFICATION)(id)),

  getDatasetPreviewList: async (id: string) => {
    const datasetPreviews = await getRequest(
      getRoute(RouteNames.GET_DATASET_PREVIEW_LIST)(id)
    );

    return GetDatasetPreviewListBody.parse(datasetPreviews);
  },

  // SOCKET
  //TODO fix url to match others
  getSocketAuthToken: async () => {
    return getRequest("/auth/token");
  }
};
