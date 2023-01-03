import { Pilot } from "../entities/pilot.entity"
import { AppDataSource } from "../utils/dataSource"
import { signJwt } from "../utils/jwt";
import config from "config";

const pilotRepository = AppDataSource.getRepository(Pilot);

export const findPilotByEmail = async({email} : {email: string}) => {
    return await pilotRepository.findOneBy({email});
};

export const createPilot = async(
    name: string,
    email: string,
    password: string,
    phone_number: string
) => {
    console.log(name);
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(Pilot, {full_name: name, email: email, password: password, phone_number: phone_number}) as Pilot
    ));
};

export const signTokens = async (pilot: Pilot) => {

    const access_token = signJwt({ sub: pilot.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });
  
    const refresh_token = signJwt({ sub: pilot.id }, 'refreshTokenPrivateKey', {
      expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    });
  
    return { access_token, refresh_token };
  };