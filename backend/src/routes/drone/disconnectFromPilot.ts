import express from "express";
import { addDroneToPilot, disconnectDrone, findPilotById, findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { createDrone, deleteVerificationCode, findDroneById } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone/disconnect', async (req, res, next) => {
    try{
        const { droneId, token } = req.body;
        
        const sub = verifyJwt(token);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const [pliot] = await findPilotByIdWithDrones({id: id});
            const drone = await findDroneById({id: droneId});
            if(pliot !== null && drone !== null){
                disconnectDrone(pliot, drone);
                res.status(200).json(
                    true
                  );
            }
        }             
    
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as disconnectFromPilot}