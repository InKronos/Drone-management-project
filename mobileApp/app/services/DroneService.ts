import axios from "axios";
import React from "react";
import { BestDrone } from "../model/drone/BestDrone";
import { Drone } from "../model/drone/Drone";
import {URL} from "react-native-dotenv";

class DroneService {
    getConnectedDrones(userToken: string){
        return new Promise<Drone[]>((resolve, reject) => {
            axios.post(`${URL}/api/drone/getconnected`,{
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
            axios.post(`${URL}/api/pilot/bestdrone`,{
                token: userToken
            }).then(res => {
                console.log(res);
                if(res.data === false)  resolve({missionCount: null, droneName: null});
                else{
                    const BestDrone = {missionCount: res.data.missionsCount, droneName: res.data.droneName};
                    resolve(BestDrone);
                }
                
            })
            .catch(err => {
                console.log(err.message);
                reject(err.message);
            })
        })
    }

    getUserDrones(userToken: string){
        return new Promise<Drone[]>((resolve, reject) => {
            axios.post(`${URL}/api/pilot/drones`,{
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
            axios.post(`${URL}/api/drone`,{
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

    disconnectDrone(id: number, userToken: string){
        return new Promise<boolean>((resolve, reject) => {
            axios.post(`${URL}/api/drone/disconnect`,{
                    token: userToken,
                    droneId: id
                }).then(res => {
                    console.log(res);
                    resolve(true);
                })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
        })
    }


    canVerify(id: number){
        return new Promise<boolean>((resolve, reject) => {
            axios.post(`${URL}/api/drone/canverify`,{
                    id: id
                }).then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err.message);
                    reject(err.message);
                })
        })
    }

    connectToDrone(userToken: string, id: number, verificationCode: number){
        return new Promise<boolean>((resolve, reject) => {
            axios.post(`${URL}/api/drone/connect`,{
                    droneId: id,
                    token: userToken,
                    verificationCode: verificationCode
                }).then(res => {
                    resolve(true);
                })
                .catch(err => {
                    reject(err.message);
                })
        })
    }
}

export default new DroneService;