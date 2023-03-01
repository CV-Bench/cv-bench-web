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
  getRoute
} from "shared-types";

import { network } from "./utils";

const baseUrl = process.env.HOST_DOMAIN || "http://localhost:3001";

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
  getModelList: async (): Promise<GetModelList> => {
    const models = await getRequest(getRoute(RouteNames.GET_MODEL_LIST)());

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
  getBackgroundList: async (): Promise<GetBackgroundList> => {
    const backgrounds = await getRequest(
      getRoute(RouteNames.GET_BACKGROUND_LIST)()
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
  postDatasets: async (body: PostDataset): Promise<{}> =>
    postRequest(getRoute(RouteNames.POST_DATASET)(), { body }),
  deleteDataset: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_DATASET)(id)),
  patchDataset: async (id: string, body: PatchDataset) =>
    patchRequest(getRoute(RouteNames.PATCH_DATASET)(id), { body }),

  // NETWORK
  getNetwork: async (id: string): Promise<GetNetwork> => {
    const background = await getRequest(getRoute(RouteNames.GET_NETWORK)(id));

    return GetNetworkBody.parse(background);
  },
  getNetworkList: async (): Promise<GetNetworkList> => {
    const backgrounds = await getRequest(
      getRoute(RouteNames.GET_NETWORK_LIST)()
    );

    return GetNetworkListBody.parse(backgrounds) as GetNetworkList;
  },
  postNetworks: async (body: PostNetwork): Promise<{}> =>
    postRequest(getRoute(RouteNames.POST_NETWORK)(), { body }),
  deleteNetwork: (id: string) =>
    deleteRequest(getRoute(RouteNames.DELETE_NETWORK)(id)),
  patchNetwork: async (id: string, body: PatchNetwork) =>
    patchRequest(getRoute(RouteNames.PATCH_NETWORK)(id), { body }),

  // TASK
  getTask: async (id: string): Promise<GetTask> => {
    const background = await getRequest(getRoute(RouteNames.GET_NETWORK)(id));

    return GetTaskBody.parse(background);
  },
  getTaskList: async (): Promise<GetTaskList> => {
    const backgrounds = await getRequest(
      getRoute(RouteNames.GET_NETWORK_LIST)()
    );

    return GetTaskListBody.parse(backgrounds) as GetTaskList;
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
  }
};
