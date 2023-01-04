import { createAction } from "@reduxjs/toolkit";

export const register = createAction("[Register]");
export const registerSuccess = createAction("[Register] success", (pilot: any) => ({payload: pilot}));
export const registerFail = createAction("[Register] fail", (error: any) => ({payload: error}));