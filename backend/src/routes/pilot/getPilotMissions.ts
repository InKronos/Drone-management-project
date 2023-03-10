import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { createDrone, findDroneById } from "../../services/drone.service";
import { Mission } from "../../entities/mission.entity";
import { findMissionByDrone } from "../../services/mission.service";


const router = express.Router();

router.post('/api/pilot/missions', async (req, res, next) => {
    try{
        
        const { token } = req.body;
        
        const sub = verifyJwt(token);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotByIdWithDrones({id});
            const missionPromise = pliot[0].drones.map(async drone => {
                const missionsOfDrone = await findMissionByDrone(drone);
                console.log(missionsOfDrone);
                return missionsOfDrone;
            })
            const missions = await Promise.all(missionPromise);
            const returnMission: Mission[] = [];
            missions.forEach(mission => {
                mission.forEach(mission => returnMission.push(mission));
            });
            returnMission.sort()
            res.status(200).json( returnMission.sort((a, b) => b.missionStart.getTime() - a.missionStart.getTime() ));
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


export {router as getPilotMissions}