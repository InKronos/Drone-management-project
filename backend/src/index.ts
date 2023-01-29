import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
import { AppDataSource } from './utils/dataSource';
import { registerPilot } from './routes/pilot/register';
import { loginPilot } from './routes/pilot/login';
import bodyParser from 'body-parser';
import { logoutPilot } from './routes/pilot/logout';
import { me } from './routes/pilot/me';
import { createDrone } from './routes/drone/createDrone';
import { getDronesConnected } from './routes/drone/getDronesConnected';
import { connectToDrone } from './routes/drone/connectToDrone';
import { getPilotDrones } from './routes/pilot/getPilotDrones';
import { createMission } from './routes/mission/createMission';
import { getMission } from './routes/mission/getMission';
import { updateMission } from './routes/mission/updateMission';
import { getPilotMissions } from './routes/pilot/getPilotMissions';
import { isMission } from './routes/pilot/isMission';
import { getPilotBestDrone } from './routes/pilot/getPilotBestDrone';
import { getDrone } from './routes/drone/getDrone';
import { ping } from './routes/drone/ping';


dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log(`Data Source has been initialized`);

    const app: Express = express();
    const port = process.env.PORT;

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(registerPilot);
    app.use(loginPilot);
    app.use(logoutPilot);
    app.use(me);
    app.use(createDrone);
    app.use(getDrone);
    app.use(getDronesConnected);
    app.use(connectToDrone);
    app.use(getPilotDrones);
    app.use(createMission);
    app.use(getMission);
    app.use(updateMission);
    app.use(getPilotMissions);
    app.use(isMission);
    app.use(getPilotBestDrone);
    app.use(ping);


    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

  


  




