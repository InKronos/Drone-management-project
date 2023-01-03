import { Pilot } from "../entities/pilot.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'projectadmin',
    password: 'mypass',
    database: 'dronemanagement',
    entities: [Pilot],
    synchronize: true,
})