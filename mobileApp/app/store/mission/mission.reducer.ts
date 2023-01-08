import { createReducer, current } from "@reduxjs/toolkit";
import { AppInitialState } from "../AppInitialState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "./mission.action";
import { MissionState } from "./MissionState";

const initialState: MissionState = AppInitialState.mission;

export const missionReducer = createReducer(initialState, builder => {
    builder.addCase(missionLoading, currentState => {
        return {
            ...currentState,
            error: null,
            missionLoading: true,
            missionGetSuccess: false,
            missionGetFail: false,
        }
    }),
    builder.addCase(showMisssionSuccess, currentState => {
        return {
            ...currentState,
            missionLoading: false,
            missionGetSuccess: true,
            missionGetFail: false,
        }
    }),
    builder.addCase(showMisssionFail, (currentState, action) => {
        return {
            ...currentState,
            missionLoading: false,
            missionGetSuccess: false,
            missionGetFail: true,
            error: action.payload
        }
    })
});