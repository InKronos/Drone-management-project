import express from "express";
import { Drone } from "../../entities/drone.entity";
import { createDrone, deleteVerificationCode, findConnectedDrones, findDroneByName, updateDroneToOnline, updateDroneWithVerificationCode } from "../../services/drone.service";


const router = express.Router();

interface droneInfo {
    droneName: string,
    longitude: string,
    latitude: string,
    verificationCode?: string,
    command?: string
}

router.post('/api/drone/ping', async (req, res, next) => {
    try{     
        const droneInfo: droneInfo = req.body;
        console.log(droneInfo.droneName);
        const drone = await findDroneByName({droneName: droneInfo.droneName})
        //console.log(drone);
        if(drone === null){
            res.status(404).json({
                status: 'fail',
                message: 'Not such drone exist'
                });
        }
        else{
            if(drone.isOnline === false){
                //first ping has no quests for drone
                await updateDroneToOnline(drone, droneInfo.longitude, droneInfo.latitude);
                res.status(200).json({});
            }
            else{
                await updateDroneToOnline(drone, droneInfo.longitude, droneInfo.latitude);
                if(droneInfo.verificationCode != undefined){
                    updateDroneWithVerificationCode(drone, droneInfo.verificationCode);
                    res.status(200).json({});
                }
                else if(drone.verificationCode === "Verify"){
                    res.status(200).json({
                        quest: 'verifycode'
                        });
                }
                else if(droneInfo.command === "deleteVerificationCode"){
                    deleteVerificationCode(drone);
                    res.status(200).json({});
                }
                else{
                    res.status(200).json({
                        quest: 'wait'
                        });
                }
                
            }   
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


export {router as ping}