import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { createDrone, deleteVerificationCode, findDroneById } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone/connect', async (req, res, next) => {
    try{
        const { droneId, token, verificationCode } = req.body;
        console.log(verificationCode);
        
        const sub = verifyJwt(token);
        console.log(sub);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotByIdWithDrones({id: id});
            const drone = await findDroneById({id: droneId});
            console.log(drone?.verificationCode);
            if(pliot !== null && drone !== null){
                console.log(drone);
                if(drone.verificationCode === String(verificationCode)){
                    await addDroneToPilot(pliot[0], drone);
                    await deleteVerificationCode(drone);
                    res.status(200).json({
                        status: 'success',
                    });
                }
                else{
                    res.status(400).json({
                        message: 'failed',
                    });
                }
                
            }

            
        }             
    
      
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as connectToDrone}