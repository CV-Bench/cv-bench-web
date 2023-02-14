import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { sessionMiddleware } from './middleware/session';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import googleAuth from './routes/auth/google';
import rateLimiterMiddleware from './middleware/rateLimiter';

dotenv.config({path: "../../.env"});

const app: Express = express();
const port = process.env.EXPRESS_PORT || 3001;

//apply middleware
app.use(sessionMiddleware);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(rateLimiterMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get("/auth/google/", googleAuth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});