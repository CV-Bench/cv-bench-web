// import { Request, Response } from "express";
// import { BaseClient, Issuer } from 'openid-client';

// let githubIssuer: Issuer<BaseClient>;
// let githubClient: BaseClient;

// Issuer.discover('https://accounts.github.com').then(gs => {
//     githubIssuer = gs;
//     console.log('Discovered issuer %s %O', githubIssuer.issuer, githubIssuer.metadata);

//     githubClient = new githubIssuer.Client({
//         client_id: process.env.GITHUB_AUTH_CLIENT_ID!,
//         client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET!,
//         redirect_uris: [],
//     });
// }).catch(e => {
//     console.error("Error in Auth-Discovery:\n\n %O", e);
//     process.exit(1);
// });

// const githubAuth = (req: Request, res: Response) => {

// }

// export default githubAuth;

//APPARENTLY DOESN'T SUPPORT OPENIDCONNECT