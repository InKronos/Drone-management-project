import { createAction } from "@reduxjs/toolkit";


export const getingDrones = createAction("[Drone]");
export const showDronesSuccess = createAction("[Drone] showDronesSuccess", (drones: any) => ({payload: drones}));
export const showDronesFail = createAction("[Drone] showDronesFail", (error: any) => ({payload: error}));