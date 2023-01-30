import express from "express";

import { findDroneById, updateDroneToVerify } from "../../services/drone.service";


const router = express.Router();


router.post('/api/drone/canverify', async (req, res, next) => {
    try{     
        const { id } = req.body;
     
        const drone = await findDroneById({id: id});
        console.log(drone);
        if(drone === null){
            res.status(404).json({
                status: 'fail',
                message: 'Not such drone exist'
                });
        }
        else{
            if(drone.verificationCode === null || drone.verificationCode === ""){
                updateDroneToVerify(drone);
                console.log("??")
                res.status(200).json({});
            }
            else{
                res.status(400).json({
                    status: 'fail',
                    message: 'Drone is verifing'
                    });
            }   
        }
        
    } 
    catch (err: any) {
        return res.status(400).json({
            status: 'fail',
            message: 'error',
        });
    }
});


export {router as canGetVerify}