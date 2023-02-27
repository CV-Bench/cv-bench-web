import { Router } from "express";

import { AuthProvider } from "types";

import {
  createAuthCallbackHandler,
  createAuthClient,
  createAuthLinkHandler,
  createAuthProviderRoute
} from "./utils";

const authProvider = AuthProvider.GOOGLE;
const googleAuthRouter = Router();

createAuthClient(
  "https://accounts.google.com",
  process.env.GOOGLE_AUTH_CLIENT_ID!,
  process.env.GOOGLE_AUTH_CLIENT_SECRET!,
  authProvider
).then((googleAuthClient) => {
  createAuthProviderRoute(googleAuthRouter, googleAuthClient, authProvider);
});

export default googleAuthRouter;
