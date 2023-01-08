import React from "react";
import { Drone } from "../model/drone/Drone";
import { getingDrones } from "../store/drone/drone.actions";


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

    getMostUsedDrone(result: string){
        return new Promise<Drone | null>((resolve, reject) => {
            setTimeout(() => {
                if(result === "positive"){
                    const drone: Drone = { name: "DJI 300", id: 20 };
   
                    resolve(drone);
                }
                else{
                    reject({message: "Connection problems"})
                }

            }, 3000)
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