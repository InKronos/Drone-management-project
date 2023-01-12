import axios from "axios";
import React from "react";
import { Drone } from "../model/drone/Drone";
import { Mission } from "../model/mission/Mission";
import { MissionPath } from "../model/mission/MissionPath";
import { MissionPathWhithoutId } from "../model/mission/MissionPathWithoutId";


class MissionService {
    getMission(userToken: string){
        return new Promise<boolean>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/pilot/ismissions',{
                    token: userToken
                }).then(res => resolve(res.data))
                .catch(err => {
                    reject(err.message);
                })
            
        })
    }

    getUserMissions(userToken: string){
        return new Promise<Mission[]>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/pilot/missions',{
                    token: userToken
                }).then(res => resolve(res.data))
                .catch(err => {
                    reject(err.message);
                })
            
        })
    }

    getMissionData(id: number, time?: number){
        return new Promise<Mission>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/mission',{
                    id: id
                }).then(res => {
                    const mission = res.data;
                    console.log(mission);
                    const missionPathWithoutId : MissionPathWhithoutId[]= []; 
                    for(let i = 0; i < mission.missionPath.length; i++){
                        missionPathWithoutId.push({latitude: parseFloat(mission.missionPath[i].latitude), longitude: parseFloat(mission.missionPath[i].longitude)})
                    }
                    mission.missionPath = missionPathWithoutId;
                    console.log("xxxx");
                    console.log(mission);
                    resolve(mission);  
                })
                .catch(err => {
                    reject(err.message);
                })

            /*
            if(id === 50){
                setTimeout(() => {
                    let drone: Drone = { droneName: "DJI 276", isOnline: true, id: 20 };
                    let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}] 
                    const mission: Mission = { missionStart: new Date("2020-05-05 15:30:23"), missionEnd: new Date("2020-05-05 15:35:23"), drone: drone, id: id, missionPath: missionPath}
                    resolve(mission);
                }, 3000)
            }
            else if(id === 51){
                console.log("xd");
                if(time === undefined){
                    setTimeout(() => {
                        let drone: Drone = { droneName: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 2){
                    setTimeout(() => {
                        let drone: Drone = { droneName: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 3){
                    setTimeout(() => {
                        let drone: Drone = { droneName: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}, {longitude: 18.498066, latitude: 50.556170}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
                else if(time === 4){
                    setTimeout(() => {
                        let drone: Drone = { droneName: "DJI 276", isOnline: true, id: 20 };
                        let missionPath: MissionPath[] = [{longitude: 18.486832, latitude: 50.561349}, {longitude: 18.494932, latitude: 50.561718}, {longitude: 18.498066, latitude: 50.556170},  {longitude: 18.495838, latitude: 50.554706}] 
                        const mission: Mission = { missionStart: new Date("2022-05-05 15:30:23"), missionEnd: new Date("2022-05-05 15:35:23"), drone: drone, id: id, missionPath: missionPath}
                        resolve(mission);
                    }, 1000)
                }
            }*/
            
        })
    }
}

export default new MissionService;