import { Request, RequestHandler, Response } from "express";
import { generators } from "openid-client";
import { BaseClient, Issuer } from "openid-client";
import { Router } from "express";
import logger from "../../util/logger";
import { loggerTitle } from "types";

const redirectUri =
  (process.env.HOST_DOMAIN || "http://localhost:3001") +
  "/auth/google/callback";

export const createAuthClient = (
  issuerDomain: string,
  clientId: string,
  clientSecret: string
) => {
  return new Promise<BaseClient>((resolve, reject) => {
    Issuer.discover(issuerDomain)
      .then((issuer) => {
        logger.info(
          loggerTitle.AUTH_CLIENT,
          "Registered Auth Provider",
          `Provider: ${issuerDomain}`
        );
        resolve(new issuer.Client({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uris: [redirectUri],
          response_types: ["id_token"],
        }));
      })
      .catch((e) => {
        logger.error(
          loggerTitle.AUTH_CLIENT,
          "Couldn't Discover Provider",
          `Provider: ${issuerDomain}`,
          e
        );
        reject(e);
        process.exit(1);
      });
  });
};

export const createAuthProviderRoute = (
  authProviderRouter: Router,
  authProviderClient: BaseClient
) => {
  authProviderRouter.get("/link", createAuthLinkHandler(authProviderClient));
  authProviderRouter.post("/callback", createAuthCallbackHandler(authProviderClient));
  return;
};

export const createAuthLinkHandler = (authProviderClient: BaseClient):RequestHandler => {
  return async (req: Request, res: Response) => {
    const nonce = generators.nonce();
    req.session.nonce = nonce;

    try {
      res.status(200).send(
        authProviderClient.authorizationUrl({
          scope: "openid email profile",
          response_mode: "form_post",
          redirect_uri: redirectUri,
          nonce: nonce,
        })
      );
    } catch (e) {
      logger.error(
        loggerTitle.AUTH_CLIENT,
        "Error creating Google Auth URL",
        e as string
      );
    }
  };
};

export const createAuthCallbackHandler = (authProviderClient: BaseClient):RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      const params = authProviderClient.callbackParams(req);
      const tokenSet = await authProviderClient.callback(redirectUri, params, {
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
        provider: tokenClaims.iss,
      };
      res.setHeader("content-type", "text/html");
      res.setHeader("content-security-policy", "script-src 'unsafe-inline'");
      res
        .status(200)
        .send(
          "<html><body><script>location.href = 'http://localhost:3000/'</script></body></html>"
        );
    } catch (e: any) {
      logger.error(loggerTitle.AUTH_CLIENT, e);
      res.status(422).end();
    }
    delete req.session.nonce;
  };
};
