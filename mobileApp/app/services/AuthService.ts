import axios from 'axios';
import {URL} from "react-native-dotenv";

class AuthService{
    login(email: string, password: string) {
        console.log(URL);
        try{
            return axios.post(`${URL}/api/login`,{
                email: email,
                password: password
            });
        } catch (error) {
            console.log("errror itd cos tam", error)
            throw error;
        }

    }

    register(name: string, email: string, password: string, phone_number: string) {
        try{
            return axios.post(`${URL}/api/register`,{
                name: name,
                email: email,
                password: password,
                phone_number
            });
        } catch (error) {
            console.log("errror itd cos tam", error)
            throw error;
        }
    }
}

export default new AuthService;