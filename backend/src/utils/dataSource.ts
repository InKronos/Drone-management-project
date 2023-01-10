import { Pilot } from "../entities/pilot.entity";
import { DataSource } from "typeorm";
import { Drone } from "../entities/drone.entity";
import { Mission } from "../entities/mission.entity";
import { MissionPath } from "../entities/missionPath.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'projectadmin',
    password: 'mypass',
    database: 'dronemanagement',
    entities: [Pilot, Drone, Mission, MissionPath],
    synchronize: true,
})