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

export const updateDroneToOnline = async (drone: Drone, longitude: string, latitude: string) => {
    drone.isOnline = true;
    drone.lastOnline = new Date();
    drone.latitude = parseFloat(latitude);
    drone.longitude = parseFloat(longitude);
    return await AppDataSource.manager.save(drone);
}

export const updateDroneToOffline =async (drone: Drone) => {
    drone.isOnline = false;
    return await AppDataSource.manager.save(drone);
}

export const findOnlineDrones = async () => {
    return await droneRepository.find({
        where: {
            isOnline: true
        }
    });
}


export const findDroneByName = async ({droneName} : {droneName: string}) => {
    return await droneRepository.findOneBy({droneName});
};

export const findConnectedDrones = async() => {
    return await droneRepository.findBy({isOnline: true});
};

export const findDroneById = async({id} : {id: number}) => {
    return await droneRepository.findOneBy({id});
};