import express from "express";
import { findPilotByIdWithDrones } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";
import { Drone } from "../../entities/drone.entity";
import { createDrone, findConnectedDrones } from "../../services/drone.service";
import { disconnect } from "../../utils/disconnect";


const router = express.Router();

router.post('/api/drone/getconnected', async (req, res, next) => {
    try{     
        const { token } = req.body;
        const sub = verifyJwt(token);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const [pliot] = await findPilotByIdWithDrones({id: id});
            const drones: Drone[] = await findConnectedDrones();
            disconnect(drones);
            const notUserDrones: Drone[] = [];
            drones.forEach(drone => {
              if(!JSON.stringify(pliot.drones).includes(JSON.stringify(drone))){
                notUserDrones.push(drone);
              }
                
            });
            res.status(200).json(
              notUserDrones
            );
        }
        else{
            return res.status(400).json({
                status: 'fail',
                message: 'Wrong Token',
            });;
        }
        
    } 
    catch (err: any) {
       
      return res.status(400).json({
        status: 'fail'
      });
          
    }
});


export {router as getDronesConnected}