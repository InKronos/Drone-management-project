import express from "express";
import { createMission } from "../services/mission.service";
import { createDrone, findDroneById } from "../services/drone.service";


const router = express.Router();

router.post('/api/mission/create', async (req, res, next) => {
    try{
        const { droneName, longitude, latitude } = req.body;
     
        const drone = await findDroneById(droneName);
        if(drone){
            const mission = await createMission(drone, longitude, latitude);
            res.status(200).json({
                status: 'success',
                id: mission.id
                });
        }
        
       
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


export {router as createMission}