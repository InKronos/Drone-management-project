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
            throw error;
        }
    }

    edit(userToken: string, name: string, email: string, password: string, phone_number: string) {
        try{
            return axios.post(`${URL}/api/edit`,{
                token: userToken,
                name: name,
                email: email,
                password: password,
                phone_number
            });
        } catch (error) {
            throw error;
        }
    }

    delete(userToken: string) {
        try{
            return axios.post(`${URL}/api/delete`,{
                token: userToken
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService;