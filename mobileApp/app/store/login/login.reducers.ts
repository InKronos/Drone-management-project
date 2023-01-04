import { createReducer } from "@reduxjs/toolkit";
import { AppInitialState } from "../AppInitialState";
import { login, loginFail, loginSuccess, logout } from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = AppInitialState.login;

export const loginReducer = createReducer(initialState, builder => {
    builder.addCase(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
            userToken: null
        }
    })
    builder.addCase(loginSuccess, (currentState, action) => {
        return {
            ...currentState,
            isLoggedIn: true,
            isLoggingIn: false,
            userToken: action.payload
        }
    })
    builder.addCase(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.payload,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })
    builder.addCase(logout, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
            userToken: null
        }
    })
})