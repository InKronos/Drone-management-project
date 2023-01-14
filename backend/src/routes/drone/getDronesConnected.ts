import express from "express";
import { Drone } from "../../entities/drone.entity";
import { createDrone, findConnectedDrones } from "../../services/drone.service";


const router = express.Router();

router.get('/api/drone/getconnected', async (req, res, next) => {
    try{     
        const drones: Drone[] = await findConnectedDrones();
        
    
        res.status(200).json({
        status: 'success',
        drones
        });
    } 
    catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
              status: 'fail',
              message: 'Drone with that name already exist',
            });
          }
          next(err);
    }
});


export {router as getDronesConnected}