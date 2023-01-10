import express from "express";
import { verifyJwt } from "../utils/jwt";
import { Pilot } from "../entities/pilot.entity";
import { findPilotByEmail, findPilotById, signTokens } from "../services/pilot.service";
import AppError from "../utils/appError";


const router = express.Router();

router.get('/api/me', async (req, res, next) => {
    try{
        console.log("I have it");
        const { token } = req.body;
        
        const sub = verifyJwt(token);
        console.log(sub);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotById({id});


            res.status(200).json({
            status: 'success',
            pliot
            });
        }
        else{
            return res.status(400).json({
                status: 'fail',
                message: 'Wrong Token',
            });;
        }
      

        
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as me}