import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { createDrone, findDroneById } from "../../services/drone.service";
import { Mission } from "../../entities/mission.entity";
import { findCountMissionByDrone, findMissionByDrone } from "../../services/mission.service";


const router = express.Router();

router.post('/api/pilot/bestdrone', async (req, res, next) => {
    try{
        
        const { token } = req.body;
        
        const sub = verifyJwt(token);
        console.log(sub);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotByIdWithDrones({id});
            console.log(pliot[0].drones);
            const missionPromise = pliot[0].drones.map(async drone => {
                const [missions, numberCount] = await findCountMissionByDrone(drone);
                return {missionsCount: numberCount, droneName: drone.droneName};
            })
            const missions = await Promise.all(missionPromise);
            const bestDrone = missions.sort((firstItem, secondItem) => secondItem.missionsCount - firstItem.missionsCount)
            console.log(missions);
            res.status(200).json(missions[0]);
        }
        else{
            return res.status(400).json({
                status: 'fail',
                message: 'Wrong Token',
            });;
        }
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as getPilotBestDrone}