import { PilotData } from "../model/pilot/PilotData";
import axios, {AxiosPromise, AxiosResponse} from 'axios';

class AuthService{
    login(email: string, password: string) : Promise<PilotData> {
        try{
            return axios.post('http://localhost:8000/api/login',{
                email: email,
                password: password
            });
        } catch (error) {
            console.log("errror itd cos tam", error)
            throw error;
        }

    }
}

export default new AuthService;