import { Drone } from "../drone/Drone";
import { MissionPath } from "./MissionPath";
import { MissionPathWhithoutId } from "./MissionPathWithoutId";

export interface Mission {
    id: number;
    missionStart: Date;
    missionEnd?: Date | null;
    drone?: Drone;
    missionPath?: MissionPath[] | MissionPathWhithoutId[];
}