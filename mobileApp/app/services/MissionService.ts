import React from "react";
import { Drone } from "../model/drone/Drone";
import { Mission } from "../model/mission/Mission";


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
                    let mission1: Mission = { date: new Date("2020-05-05"), drone: drone1, id: 50}
                    let mission2: Mission = { date: new Date("2021-05-05"), drone: drone1, id: 51}
                    const missions : Mission[] = [mission1, mission2];
                    resolve(missions);
            }, 3000)
        })
    }
}

export default new MissionService;