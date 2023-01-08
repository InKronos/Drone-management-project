import { Drone } from "../drone/Drone";

export interface Mission {
    id: number;
    date: Date;
    drone?: Drone;
}