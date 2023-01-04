import { createReducer } from "@reduxjs/toolkit";
import { AppInitialState } from "../AppInitialState";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = AppInitialState.loading;

export const loadingReducer = createReducer(initialState, builder => {
    builder.addCase(show, () => {
        return {show: true};
    }),
    builder.addCase(hide, () => {
        return {show: false};
    })
});