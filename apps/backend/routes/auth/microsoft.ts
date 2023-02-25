import { Router } from "express";
import { createAuthCallbackHandler, createAuthClient, createAuthLinkHandler, createAuthProviderRoute } from "./utils";

const routeName = "/microsoft";
const microsoftAuthRouter = Router();

createAuthClient("https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration", process.env.MICROSOFT_AUTH_CLIENT_ID!, process.env.MICROSOFT_AUTH_CLIENT_SECRET!, routeName).then((microsoftAuthClient) => {
  createAuthProviderRoute(microsoftAuthRouter, microsoftAuthClient, routeName);
});

export default microsoftAuthRouter;