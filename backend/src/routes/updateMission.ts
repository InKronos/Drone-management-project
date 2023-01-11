import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../services/pilot.service";
import { verifyJwt } from "../utils/jwt";
import { createDrone, findDroneById } from "../services/drone.service";
import { findMissionById, updateMission } from "../services/mission.service";


const router = express.Router();

router.post('/api/mission/update', async (req, res, next) => {
    try{
        
        const { id, longitude, latitude, isEnd } = req.body;
        
 
        const mission = await findMissionById(id);
        await updateMission(mission[0], isEnd, longitude, latitude);
        res.status(200).json({
            status: 'success',
            });
       
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as updateMission}