import { DroneState } from "./drone/DroneState";
import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";
import { MissionState } from "./mission/MissionState";
import { RegisterState } from "./register/RegisterState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    register: RegisterState;
    drone: DroneState;
    mission: MissionState;
}