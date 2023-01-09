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
                    let mission2: Mission = { missionStart: new Date("2020-05-05 15:30:23"), drone: drone1, id: 51}
                    const missions : Mission[] = [mission1, mission2];
                    resolve(missions);
            }, 3000)
        })
    }

    getMissionData(id: number, time?: number){
        return new Promise<Mission>((resolve, reject) => {
            if(id === 50){
                setTimeout(() => {
                    let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                    let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}] 
                    const mission: Mission = { missionStart: new Date("2020-05-05 15:30:23"), missionEnd: new Date("2020-05-05 15:35:23"), drone: drone, id: id, missionPath: missionPath}
                    resolve(mission);
                }, 3000)
            }
            else if(id === 51){
                console.log("xd");
                if(time === undefined){
                    setTimeout(() => {
                        let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 2){
                    setTimeout(() => {
                        let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 3){
                    setTimeout(() => {
                        let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}, {longitude: 18.498066, latitude: 50.556170}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 4){
                    setTimeout(() => {
                        let drone: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}, {longitude: 18.498066, latitude: 50.556170},  {longitude: 18.495838, latitude: 50.554706}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), missionEnd: new Date("2022-05-05 15:35:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
            }
            
        })
    }
}

export default new MissionService;