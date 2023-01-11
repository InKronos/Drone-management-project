import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../services/pilot.service";
import { verifyJwt } from "../utils/jwt";
import { createDrone, findDroneById } from "../services/drone.service";
import { findMissionById } from "../services/mission.service";


const router = express.Router();

router.post('/api/mission', async (req, res, next) => {
    try{
        
        const { id } = req.body;
        
 
        const [mission] = await findMissionById(id);
        res.status(200).json( mission);
       
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as getMission}