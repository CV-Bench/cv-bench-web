import { Router } from "express";

import { AuthProvider } from "shared-types";

import {
  createAuthCallbackHandler,
  createAuthClient,
  createAuthLinkHandler,
  createAuthProviderRoute
} from "./utils";

const authProvider = AuthProvider.MICROSOFT;
const microsoftAuthRouter = Router();

createAuthClient(
  "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
  process.env.MICROSOFT_AUTH_CLIENT_ID!,
  process.env.MICROSOFT_AUTH_CLIENT_SECRET!,
  authProvider
).then((microsoftAuthClient) => {
  createAuthProviderRoute(
    microsoftAuthRouter,
    microsoftAuthClient,
    authProvider
  );
});

export default microsoftAuthRouter;
