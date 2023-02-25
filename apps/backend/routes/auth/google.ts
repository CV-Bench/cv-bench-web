import { Router } from "express";
import { createAuthCallbackHandler, createAuthClient, createAuthLinkHandler, createAuthProviderRoute } from "./utils";

const googleAuthRouter = Router();

createAuthClient("https://accounts.google.com", process.env.GOOGLE_AUTH_CLIENT_ID!, process.env.GOOGLE_AUTH_CLIENT_SECRET!).then((googleAuthClient) => {
  createAuthProviderRoute(googleAuthRouter, googleAuthClient);
});

export default googleAuthRouter;