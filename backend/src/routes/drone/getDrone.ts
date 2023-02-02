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
            numberOfFinishedMissions: numberCount,
            numberOfBatteires: drone.numberOfBatteires,
            numberOfChargedBatteries: drone.numberOfChargedBatteries

          });
        }
    } 
    catch (err: any) {
          next(err);
    }
});


export {router as getDrone}