import { Pilot } from "../entities/pilot.entity"
import { AppDataSource } from "../utils/dataSource"
import { signJwt } from "../utils/jwt";
import config from "config";
import { Drone } from "../entities/drone.entity";

const pilotRepository = AppDataSource.getRepository(Pilot);

export const findPilotByEmail = async({email} : {email: string}) => {
    return await pilotRepository.findOneBy({email});
};

export const findPilotById = async({id} : {id: number}) => {
    return await pilotRepository.findOneBy({id});
};

export const findPilotByIdWithDrones = async({id} : {id: number}) => {
    return await pilotRepository.find({
        relations: ['drones'],
        where: { id: id }
    });
};

export const disconnectDrone = async(pilot: Pilot, droneToDisconnect: Drone) => {
    const newdrones = pilot.drones.filter((drone) => drone.id !== droneToDisconnect.id);
    pilot.drones = newdrones;
    return await AppDataSource.manager.save(pilot);
}


export const createPilot = async(
    name: string,
    email: string,
    password: string,
    phone_number: string
) => {
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(Pilot, {full_name: name, email: email, password: password, phone_number: phone_number}) as Pilot
    ));
};

export const signTokens = async (pilot: Pilot) => {

    const access_token = signJwt({ sub: pilot.id });
    const refresh_token = signJwt({ sub: pilot.id });
  
    return { access_token, refresh_token };
  };

export const addDroneToPilot = async(pilot: Pilot, drone: Drone) => {
    console.log(drone);
    pilot.drones === undefined ?
        pilot.drones = [drone] : pilot.drones.push(drone);
    return (await AppDataSource.manager.save(pilot));
}