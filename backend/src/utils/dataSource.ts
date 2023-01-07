import { Pilot } from "../entities/pilot.entity";
import { DataSource } from "typeorm";
import { Drone } from "src/entities/drone.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'projectadmin',
    password: 'mypass',
    database: 'dronemanagement',
    entities: [Pilot, Drone],
    synchronize: true,
})