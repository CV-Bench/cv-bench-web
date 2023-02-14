import { Request, Response } from "express";
import { BaseClient, Issuer } from "openid-client";

let googleIssuer: Issuer<BaseClient>;
let googleClient: BaseClient;

Issuer.discover("https://accounts.google.com")
  .then((gs) => {
    googleIssuer = gs;
    console.log(
      "Discovered issuer %s %O",
      googleIssuer.issuer,
      googleIssuer.metadata
    );

    googleClient = new googleIssuer.Client({
      client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
      client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
      redirect_uris: [],
    });
  })
  .catch((e) => {
    console.error("Error in Auth-Discovery:\n\n %O", e);
    process.exit(1);
  });

const googleAuth = async (req: Request, res: Response) => {
  const params = googleClient.callbackParams(req);
  const tokenSet = await googleClient.callback("", params);
};

export default googleAuth;