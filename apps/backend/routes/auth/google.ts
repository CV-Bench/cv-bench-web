import { Request, Response } from "express";
import { generators } from "openid-client";
import { BaseClient, Issuer } from "openid-client";
import { Router } from "express";

const googleAuthRouter = Router();
const redirectUri =
  (process.env.HOST_DOMAIN || "http://localhost") + "/auth/google/callback";

let googleIssuer: Issuer<BaseClient>;
let googleClient: BaseClient;

Issuer.discover("https://accounts.google.com")
  .then((gs) => {
    googleIssuer = gs;

    googleClient = new googleIssuer.Client({
      client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
      redirect_uris: [redirectUri],
    });
  })
  .catch((e) => {
    console.error("Error in Auth-Discovery:\n\n %O", e);
    process.exit(1);
  });

const googleAuthLink = async (req: Request, res: Response) => {
  res.status(200).send(
    googleClient.authorizationUrl({
      scope: "openid email profile",
      response_mode: "form_post",
      redirect_uri: redirectUri,
      nonce: req.session.id,
    })
  );
};

const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const params = googleClient.callbackParams(req);
    const tokenSet = await googleClient.callback(redirectUri, params, {
      nonce: req.session.id,
    });
    req.session.tokenSet = tokenSet;
    req.session.tokenClaims = tokenSet.claims();
    res.send(tokenSet.id_token);
  } catch (e: any) {
    res.status(422).send(JSON.stringify(e));
  }
};

googleAuthRouter.get("/link", googleAuthLink);
googleAuthRouter.post("/callback", googleAuthCallback);

export default googleAuthRouter;
