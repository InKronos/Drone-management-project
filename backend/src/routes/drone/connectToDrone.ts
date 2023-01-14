import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { createDrone, findDroneById } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone/connect', async (req, res, next) => {
    try{
        const { droneId, token } = req.body;
        
        const sub = verifyJwt(token);
        console.log(sub);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotByIdWithDrones({id});
            const drone = await findDroneById(droneId);
            if(pliot !== null && drone !== null){
                await addDroneToPilot(pliot[0], drone);
                res.status(200).json({
                    status: 'success',
                });
            }

            
        }             
    
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as connectToDrone}