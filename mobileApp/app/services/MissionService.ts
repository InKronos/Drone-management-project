import React from "react";
import { Mission } from "../model/mission/Mission";


class MissionService {
    getMission(){
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                    //const mission: Mission = { id: 20, date: new Date("2019-01-16") };
                    resolve(true);
            }, 3000)
        })
    }
}

export default new MissionService;