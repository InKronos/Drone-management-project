export interface Drone {
    id: number;
    droneName: string;
    isOnline?: boolean;
    longitude: number;
    latitude: number;
    numberOfBatteries?: number;
    numberOfChargedBatteries?: number;
    numberOfFinishedMissions?: number;
    isInMission?: boolean;
}