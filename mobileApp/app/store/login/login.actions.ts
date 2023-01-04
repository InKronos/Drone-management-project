import { createAction } from "@reduxjs/toolkit";
import { Pilot } from "../../model/pilot/Pilot";

export const login = createAction("[Login]");
export const loginSuccess = createAction("[Login] success", (pilot: any) => ({payload: pilot}));
export const loginFail = createAction("[Login] fail", (error: any) => ({payload: error}));

export const logout = createAction("[Logout]");