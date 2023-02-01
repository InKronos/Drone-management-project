import express from "express";
import { disconnectSingleDrone } from "../../utils/disconnect";
import { findDroneById } from "../../services/drone.service";
import { findCountMissionByDrone } from "../../services/mission.service";


const router = express.Router();

router.post('/api/drone', async (req, res, next) => {
    try{
        const { id } = req.body;
     
        const drone = await findDroneById({id: id});
        if(drone !== null){ 
          await disconnectSingleDrone(drone);
          const [missions, numberCount] = await findCountMissionByDrone(drone);
          res.status(200).json({
            id: drone.id,
            droneName: drone.droneName,
            isOnline: drone.isOnline,
            longitude: drone.longitude,
            latitude: drone.latitude,
            numberOfFinishedMissions: numberCount
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


export {router as getDrone}