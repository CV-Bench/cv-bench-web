import { Router } from "express";
import { createAuthCallbackHandler, createAuthClient, createAuthLinkHandler, createAuthProviderRoute } from "./utils";

const routeName = "/google";
const googleAuthRouter = Router();

createAuthClient("https://accounts.google.com", process.env.GOOGLE_AUTH_CLIENT_ID!, process.env.GOOGLE_AUTH_CLIENT_SECRET!, routeName).then((googleAuthClient) => {
  createAuthProviderRoute(googleAuthRouter, googleAuthClient, routeName);
});

export default googleAuthRouter;