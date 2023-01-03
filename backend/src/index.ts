import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
import { AppDataSource } from './utils/dataSource';
import { registerPilot } from './routes/register';
import { loginPilot } from './routes/login';
import bodyParser from 'body-parser';
import { logoutPilot } from './routes/logout';


dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log(`Data Source has been initialized`);

    const app: Express = express();
    const port = process.env.PORT;

    app.use(
      cors({
        origin: "http://localhost:8000",
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(registerPilot);
    app.use(loginPilot);
    app.use(logoutPilot);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

  


  




