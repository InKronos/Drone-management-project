import { Drone } from "../entities/drone.entity";
import { updateDroneToOffline } from "../services/drone.service";


export const disconnect = (drones: Drone[]) => {
    drones.map(async drone => {
        if((new Date().getTime() - new Date(drone.lastOnline).getTime()) / 1000 > 30){
            await updateDroneToOffline(drone);
        }
    });
}

export const disconnectSingleDrone = async (drone: Drone) => {
  
    if((new Date().getTime() - new Date(drone.lastOnline).getTime()) / 1000 > 30)
        await updateDroneToOffline(drone);

}