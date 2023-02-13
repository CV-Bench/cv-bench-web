import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { sess } from './middleware/session';
import cookieParser from "cookie-parser";
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//apply middleware
app.use(sess);
app.use(cookieParser(process.env.REDIS_SECRET));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});