export interface Drone {
    id: number;
    name: string;
    isOnline?: boolean;
    numberOfBatteries?: number;
    numberOfChargedBatteries?: number;
    numberOfFinishedMissions?: number;
    isInMission?: boolean;
}