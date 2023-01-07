import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        userToken: null
    },
    register: {
        error: null,
        isCreated: false,
        isRegistering: false
    },
    drone: {
        error: null,
        droneLoading: false,
        droneGetSuccess: false,
        droneGetFail: false
    }
}