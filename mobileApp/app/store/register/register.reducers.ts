import { createReducer } from "@reduxjs/toolkit";
import { AppInitialState } from "../AppInitialState";
import { register, registerFail, registerSuccess } from "./register.action";
import { RegisterState } from "./RegisterState";

const initialState: RegisterState = AppInitialState.register;

export const registerReducer = createReducer(initialState, builder => {
    builder.addCase(register, currentState => {
        return {
            ...currentState,
            error: null,
            isCreated: false,
            isRegistering: true
        }
    })
    builder.addCase(registerSuccess, currentState => {
        return {
            ...currentState,
            isCreated: true,
            isRegistering: false
        }
    })
    builder.addCase(registerFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.payload,
            isCreated: false,
            isRegistering: false
        }
    })
})