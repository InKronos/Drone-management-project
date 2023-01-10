import { Drone } from "../entities/drone.entity";
import { AppDataSource } from "../utils/dataSource";

const droneRepository = AppDataSource.getRepository(Drone);


export const createDrone = async(
    droneName: string,
) => {
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(Drone, {droneName: droneName, isConnected: true}) as Drone
    ));
};

export const findDroneByName = async ({droneName} : {droneName: string}) => {
    return await droneRepository.findOneBy({droneName});
};