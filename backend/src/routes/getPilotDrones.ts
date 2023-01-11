import express from "express";
import { addDroneToPilot, findPilotById, findPilotByIdWithDrones } from "../services/pilot.service";
import { verifyJwt } from "../utils/jwt";
import { createDrone, findDroneById } from "../services/drone.service";


const router = express.Router();

router.post('/api/pilot/drones', async (req, res, next) => {
    try{
        
        const { token } = req.body;
        
        const sub = verifyJwt(token);
        console.log(sub);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotByIdWithDrones({id});
            res.status(200).json({
            status: 'success',
            pliot
            });
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


export {router as getPilotDrones}