import { MissionPath } from "../entities/missionPath.entity";
import { Drone } from "../entities/drone.entity";
import { Mission } from "../entities/mission.entity";
import { AppDataSource } from "../utils/dataSource";

const missionRepository = AppDataSource.getRepository(Mission);

export const createMission = async(
    drone: Drone,
    longitude: number,
    latitude: number
) => {
    const missionPath = new MissionPath();
    missionPath.latitude = latitude;
    missionPath.longitude = longitude;
    await AppDataSource.manager.save(missionPath);
    const missionPaths = [missionPath];
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(Mission, {drone: drone, missionStart: new Date(), missionPath: missionPaths}) as Mission
    ));
};


export const findMissionById = async({id} : {id: number}) => {
    return await missionRepository.find({
        relations: {
            missionPath: true,
            drone: true
        },
        where: { id: id }
    });
};

export const findMissionByDrone = async(
    drone: Drone
) => {
    return await missionRepository.find({
        relations: {
            drone: true
        },
        where: { 
            drone: {
                id: drone.id
        }}
    });
};

export const findCountMissionByDrone = async(
    drone: Drone
) => {
    return await missionRepository.findAndCount({
        relations: {
            drone: true
        },
        where: { 
            drone: {
                id: drone.id
        }}
    });
};

export const updateMission = async(
    mission: Mission,
    isEnd: boolean,
    longitude: number,
    latitude: number
    ) => {
        const missionPath = new MissionPath();
        missionPath.latitude = latitude;
        missionPath.longitude = longitude;
        await AppDataSource.manager.save(missionPath);
        mission.missionPath.push(missionPath);
        console.log(isEnd);
        if(isEnd) 
            mission.missionEnd = new Date();
        return await AppDataSource.manager.save(mission);
};
