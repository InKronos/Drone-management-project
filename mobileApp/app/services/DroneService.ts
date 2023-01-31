import axios from "axios";
import React from "react";
import { BestDrone } from "../model/drone/BestDrone";
import { Drone } from "../model/drone/Drone";

class DroneService {
    getConnectedDrones(userToken: string){
        return new Promise<Drone[]>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/drone/getconnected',{
                    token: userToken
                }).then(res => {
                    console.log(res);
                    const drones: Drone[] = res.data;
                    resolve(drones);
                })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
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
                console.log(err.message);
                reject(err.message);
            })
        })
    }

    getUserDrones(userToken: string){
        return new Promise<Drone[]>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/pilot/drones',{
                    token: userToken
                }).then(res => {
                    console.log(res);
                    const drones: Drone[] = res.data;
                    resolve(drones);
                })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
         })
    }

    getDrone(id: number){
        return new Promise<Drone>((resolve, reject) => {
            axios.post('http://192.168.0.197:8000/api/drone',{
                    id: id
                }).then(res => {
                    console.log(res);
                    const drone: Drone = res.data;
                    resolve(drone);
                })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
        })
    }
}

export default new DroneService;