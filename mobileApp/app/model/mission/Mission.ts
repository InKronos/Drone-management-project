import { Drone } from "../drone/Drone";
import { MissionPath } from "./MissionPath";

export interface Mission {
    id: number;
    missionStart: Date;
    missionEnd?: Date;
    drone?: Drone;
    missionPath?: MissionPath[];
}