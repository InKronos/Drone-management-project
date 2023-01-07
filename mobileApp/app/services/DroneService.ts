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
}

export default new DroneService;