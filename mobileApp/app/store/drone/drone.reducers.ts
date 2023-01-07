import { createReducer, current } from "@reduxjs/toolkit";
import { AppInitialState } from "../AppInitialState";
import { getingDrones, showDronesFail, showDronesSuccess } from "./drone.actions";
import { DroneState } from "./DroneState";

const initialState: DroneState = AppInitialState.drone;

export const droneReducer = createReducer(initialState, builder => {
    builder.addCase(getingDrones, currentState => {
        return {
            ...currentState,
            droneLoading: true,
            droneGetSuccess: false,
            droneGetFail: false,
            error: null
        }
    }),
    builder.addCase(showDronesSuccess, currentState => {
        return {
            ...currentState,
            droneLoading: false,
            droneGetSuccess: true,
            droneGetFail: false
        }
    }),
    builder.addCase(showDronesFail, (currentState, action) => {
        return {
            ...currentState,
            droneLoading: false,
            droneGetSuccess: false,
            droneGetFail: true,
            error: action.payload
        }
    })
});