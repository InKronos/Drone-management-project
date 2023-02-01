import { disconnect } from "process";
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
    drone.verificationCode = null;
    return await AppDataSource.manager.save(drone);
}

export const updateDroneToVerify =async (drone: Drone) => {
    drone.verificationCode = "Verify";
    return await AppDataSource.manager.save(drone);
}

export const updateDroneWithVerificationCode = async (drone: Drone, verificationCode: string) => {
    drone.verificationCode = verificationCode;
    return await AppDataSource.manager.save(drone);
}

export const deleteVerificationCode = async (drone: Drone) => {
    drone.verificationCode = null;
    return await AppDataSource.manager.save(drone);
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