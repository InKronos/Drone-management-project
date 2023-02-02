import express from "express";
import { disconnectSingleDrone } from "../../utils/disconnect";
import { findDroneById, updateDroneBatteries } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone/changebatteries', async (req, res, next) => {
    try{
        const { id, numberOfBatteires, numberOfChargedBatteries} = req.body;
       
        const drone = await findDroneById({id: id});
        if(drone !== null){ 

          await disconnectSingleDrone(drone);
          await updateDroneBatteries(drone, numberOfBatteires, numberOfChargedBatteries);
          res.status(200).json(true);
        }
    } 
    catch (err: any) {
          next(err);
    }
});


export {router as changeBatteries}