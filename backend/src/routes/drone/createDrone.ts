import express from "express";
import { createDrone } from "../../services/drone.service";


const router = express.Router();

router.post('/api/drone/create', async (req, res, next) => {
    try{
        const { droneName } = req.body;
     
        const drone = await createDrone(droneName);
        
    
        res.status(201).json({
        status: 'success',
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


export {router as createDrone}