import { createAction } from "@reduxjs/toolkit";


export const missionLoading = createAction("[Misssion]");
export const showMisssionSuccess = createAction("[Misssion] Success", (drones: any) => ({payload: drones}));
export const showMisssionFail = createAction("[Misssion] Fail", (error: any) => ({payload: error}));