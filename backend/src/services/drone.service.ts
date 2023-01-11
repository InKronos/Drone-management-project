import { Drone } from "../entities/drone.entity";
import { AppDataSource } from "../utils/dataSource";

const droneRepository = AppDataSource.getRepository(Drone);


export const createDrone = async(
    droneName: string,
) => {
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(Drone, {droneName: droneName, isOnline: true}) as Drone
    ));
};

export const findDroneByName = async ({droneName} : {droneName: string}) => {
    return await droneRepository.findOneBy({droneName});
};

export const findConnectedDrones = async() => {
    return await droneRepository.findBy({isOnline: true});
};

export const findDroneById = async({id} : {id: number}) => {
    return await droneRepository.findOneBy({id});
};