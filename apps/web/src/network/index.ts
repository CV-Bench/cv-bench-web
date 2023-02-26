/*  */
import {
  GetBackground,
  GetBackgroundBody,
  GetBackgroundList,
  GetBackgroundListBody,
  GetModel,
  GetModelBody,
  GetModelList,
  GetModelListBody,
  PatchBackground,
  PatchModel,
  PostBackground,
  PostBackgroundResponse,
  PostBackgroundResponseBody,
  PostModel,
  PostModelResponse,
  PostModelResponseBody,
  RouteNames,
  getRoute
} from "types";
import { network } from "./utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "";

const fetchCors = (url: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(url, {
    ...init,
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      [process.env.NEXT_PUBLIC_APP_TOKEN_KEY as string]: process.env
        .NEXT_PUBLIC_APP_TOKEN as string
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

    try {
      GetModelListBody.parse(models);
    }
    catch (e) { console.error(e) }

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
  downloadModel: () => { },

  // BACKGROUND
  getBackground: async (id: string): Promise<GetBackground> => {
    const model = await getRequest(getRoute(RouteNames.GET_BACKGROUND)(id));

    return GetBackgroundBody.parse(model);
  },
  getBackgroundList: async (): Promise<GetBackgroundList> => {
    const models = await getRequest(getRoute(RouteNames.GET_BACKGROUND_LIST)());

    return GetBackgroundListBody.parse(models);
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
  downloadBackground: () => { }
};
