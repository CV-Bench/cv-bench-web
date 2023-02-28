import { Request, RequestHandler, Response } from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { generators } from "openid-client";
import { BaseClient, Issuer } from "openid-client";

import { AuthProvider, loggerTitle } from "shared-types";

import Database from "../../connectors/mongo";
import logger from "../../util/logger";

const redirectUriBase =
  (process.env.HOST_DOMAIN || "http://localhost") + "/auth/";

export const createAuthClient = (
  issuerDomain: string,
  clientId: string,
  clientSecret: string,
  authProvider: AuthProvider
) => {
  return new Promise<BaseClient>((resolve, reject) => {
    Issuer.discover(issuerDomain)
      .then((issuer) => {
        logger.info(
          loggerTitle.AUTH_CLIENT,
          "Registered Auth Provider",
          `Provider: ${issuerDomain}`
        );
        resolve(
          new issuer.Client({
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uris: [redirectUriBase + authProvider + "/callback"],
            response_types: ["id_token"]
          })
        );
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
  authProviderClient: BaseClient,
  authProvider: AuthProvider
) => {
  authProviderRouter.get(
    "/link",
    createAuthLinkHandler(authProviderClient, authProvider)
  );
  authProviderRouter.post(
    "/callback",
    createAuthCallbackHandler(authProviderClient, authProvider)
  );
  return;
};

export const createAuthLinkHandler = (
  authProviderClient: BaseClient,
  authProvider: AuthProvider
): RequestHandler => {
  return async (req: Request, res: Response) => {
    if (!req.session.nonce) req.session.nonce = {};
    const nonce = generators.nonce();
    req.session.nonce[authProvider] = nonce;

    try {
      res.status(200).send(
        authProviderClient.authorizationUrl({
          scope: "openid email profile",
          response_mode: "form_post",
          redirect_uri: redirectUriBase + authProvider + "/callback",
          nonce: nonce
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

export const createAuthCallbackHandler = (
  authProviderClient: BaseClient,
  authProvider: AuthProvider
): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      if (!req.session.nonce) req.session.nonce = {};
      const params = authProviderClient.callbackParams(req);
      const tokenSet = await authProviderClient.callback(
        redirectUriBase + authProvider + "/callback",
        params,
        {
          nonce: req.session.nonce[authProvider]
        }
      );
      const tokenClaims = tokenSet.claims();
      req.session.user = {
        id: tokenClaims.sub!,
        name: tokenClaims.name!,
        email: tokenClaims.email!,
        picture: tokenClaims.picture!,
        locale: tokenClaims.locale!,
        loggedInAt: new Date(),
        provider: authProvider
      };
      res.setHeader("content-type", "text/html");
      res.setHeader("content-security-policy", "script-src 'unsafe-inline'");
      //check if user exists
      Database.User.findOne(req.session.user.id)
        .then((result) => {
          if (result) {
            req.session.user!._id = new ObjectId(result._id);
            res
              .status(200)
              .send(
                "<html><body><script>location.href = 'http://localhost:3000/'</script></body></html>"
              );
          } else
            res
              .status(200)
              .send(
                "<html><body><script>location.href = 'http://localhost:3000/signup'</script></body></html>"
              );
        })
        .catch((e) => {
          res.status(500).end();
        });
    } catch (e: any) {
      logger.error(loggerTitle.AUTH_CLIENT, e);
      res.status(422).end();
    }
    delete req.session.nonce;
  };
};
