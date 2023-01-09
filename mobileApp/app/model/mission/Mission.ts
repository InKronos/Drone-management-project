import { Drone } from "../drone/Drone";
import { MissionPath } from "./MissionPath";

export interface Mission {
    id: number;
    date: Date;
    drone?: Drone;
    missionPath?: MissionPath[];
}