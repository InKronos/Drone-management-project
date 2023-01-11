import axios from "axios";
import React from "react";
import { BestDrone } from "../model/drone/BestDrone";
import { Drone } from "../model/drone/Drone";

class DroneService {
    getDrones(result: string){
        return new Promise<Drone[]>((resolve, reject) => {
            setTimeout(() => {
                if(result === "positive"){
                    const drones: Drone[] = [];
                    let drone1: Drone = { name: "DJI 276", id: 20 };
                    let drone2: Drone = { name: "Bayraktar", id: 21 };
                    drones.push(drone1);
                    drones.push(drone2);
                    resolve(drones);
                }
                else{
                    reject({message: "Connection problems"})
                }

            }, 3000)
        })
    }

    getMostUsedDrone(userToken: string){
        return new Promise<BestDrone>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/pilot/bestdrone',{
                token: userToken
            }).then(res => {
                console.log(res);
                const BestDrone = {missionCount: res.data.missionsCount, droneName: res.data.droneName}
                resolve(BestDrone)
            })
            .catch(err => {
                console.log("dupa");
                console.log(err.message);
                reject(err.message);
            })
        })
    }

    getUserDrones(result: string){
        return new Promise<Drone[]>((resolve, reject) => {
            setTimeout(() => {
                if(result === "positive"){
                    const drones: Drone[] = [];
                    let drone1: Drone = { name: "DJI 276", isOnline: true, id: 20 };
                    let drone2: Drone = { name: "Bayraktar", isOnline: false, id: 21 };
                    drones.push(drone1);
                    drones.push(drone2);
                    resolve(drones);
                }
                else{
                    reject({message: "Connection problems"})
                }

            }, 3000)
        })
    }

    getDrone(id: number){
        return new Promise<Drone>((resolve, reject) => {
            setTimeout(() => {
                if(id === 20){
                    const drone: Drone = { name: "DJI 276", isOnline: true, id: 20, numberOfBatteries: 4, numberOfChargedBatteries: 2, numberOfFinishedMissions: 0, isInMission: false };
                    resolve(drone);
                }
                else{
                    reject({message: "Connection problems"})
                }

            }, 3000)
        })
    }
}

export default new DroneService;