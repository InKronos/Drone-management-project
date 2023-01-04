import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/loading.reducers";
import { loginReducer } from "./login/login.reducers";
import { registerReducer } from "./register/register.reducers";

export const reducers = {
    loading: loadingReducer,
    login: loginReducer,
    register: registerReducer
};

export const store = configureStore({
    reducer: reducers
})