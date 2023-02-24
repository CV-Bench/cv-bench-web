import { Request, Response } from "express";
import { generators } from "openid-client";
import { BaseClient, Issuer } from "openid-client";
import { Router } from "express";
import logger from "../../util/logger";
import { AuthProvider, loggerTitle } from "types";

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
      response_types: ["id_token"],
    });
  })
  .catch((e) => {
    console.error("Error in Auth-Discovery:\n\n %O", e);
    process.exit(1);
  });

const googleAuthLink = async (req: Request, res: Response) => {
  const nonce = generators.nonce();
  req.session.nonce = nonce;

  try {
    res.status(200).send(
      googleClient.authorizationUrl({
        scope: "openid email profile",
        response_mode: "form_post",
        redirect_uri: redirectUri,
        nonce: nonce,
      })
    );
  } catch (e) {
    logger.error(loggerTitle.AUTH_CLIENT, "Error creating Google Auth URL", e as string);
  }
};

const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const params = googleClient.callbackParams(req);
    const tokenSet = await googleClient.callback(redirectUri, params, {
      nonce: req.session.nonce,
    });
    const tokenClaims = tokenSet.claims();
    req.session.user = {
      id: tokenSet.id_token!,
      name: tokenClaims.name!,
      email: tokenClaims.email!,
      picture: tokenClaims.picture!,
      locale: tokenClaims.locale!,
      loggedInAt: new Date(),
      provider: AuthProvider.GOOGLE
    };
    res.setHeader("content-type", "text/html");
    res.setHeader("content-security-policy", "script-src 'unsafe-inline'");
    res.status(200).send("<html><body><script>location.href = 'http://localhost:3000/'</script></body></html>");
  } catch (e: any) {
    logger.error(loggerTitle.AUTH_CLIENT, e);
    res.status(422).end();
  }
  delete req.session.nonce;
};

googleAuthRouter.get("/link", googleAuthLink);
googleAuthRouter.post("/callback", googleAuthCallback);

export default googleAuthRouter;
