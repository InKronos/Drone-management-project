import React from "react";
import { Drone } from "../model/drone/Drone";


class DroneService {
    getDrones(result: string){
        return new Promise<Drone[]>((resolve, reject) => {
            setTimeout(() => {
                if(result === "positive"){
                    const drones: Drone[] = [];
                    let drone1: Drone = { name: "DJI 276" };
                    let drone2: Drone = { name: "Bayraktar" };
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
                    const drone: Drone = { name: "DJI 300" };
   
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
                    let drone1: Drone = { name: "DJI 276", isOnline: true };
                    let drone2: Drone = { name: "Bayraktar", isOnline: false };
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
}

export default new DroneService;