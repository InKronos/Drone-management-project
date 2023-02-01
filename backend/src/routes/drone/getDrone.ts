import express from "express";
import { disconnectSingleDrone } from "../../utils/disconnect";
import { findDroneById } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone', async (req, res, next) => {
    try{
        const { id } = req.body;
     
        const drone = await findDroneById({id: id});
        if(drone !== null) await disconnectSingleDrone(drone);
    
        res.status(200).json(drone);
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


export {router as getDrone}