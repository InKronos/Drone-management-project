import React from "react";
import { Drone } from "../model/drone/Drone";
import { Mission } from "../model/mission/Mission";
import { MissionPath } from "../model/mission/MissionPath";


class MissionService {
    getMission(){
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                    //const mission: Mission = { id: 20, date: new Date("2019-01-16") };
                    resolve(true);
            }, 3000)
        })
    }

    getUserMissions(){
        return new Promise<Mission[]>((resolve, reject) => {
            setTimeout(() => {
                    let drone1: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                    let mission1: Mission = { missionStart: new Date("2020-05-05 15:30:23"), drone: drone1, id: 50}
                    let mission2: Mission = { missionStart: new Date("2021-05-05"), drone: drone1, id: 51}
                    const missions : Mission[] = [mission1, mission2];
                    resolve(missions);
            }, 3000)
        })
    }

    getMissionData(id: number){
        return new Promise<Mission>((resolve, reject) => {
            setTimeout(() => {
                    let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                    let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718},] 
                    const mission: Mission = { missionStart: new Date("2020-05-05 15:30:23"), missionEnd: new Date("2020-05-05 15:35:23"), drone: drone, id: 50, missionPath: missionPath}
                    resolve(mission);
            }, 3000)
        })
    }
}

export default new MissionService;