export interface Drone {
    id: number;
    droneName: string;
    isOnline?: boolean;
    imageURL?: string,
    numberOfBatteries?: number;
    numberOfChargedBatteries?: number;
    numberOfFinishedMissions?: number;
    isInMission?: boolean;
}