import express from "express";
import { Pilot } from "../../entities/pilot.entity";
import { findPilotByEmail, signTokens } from "../../services/pilot.service";
import AppError from "../../utils/appError";


const router = express.Router();

router.post('/api/login', async (req, res, next) => {
    try{
        console.log("I have it");
        const { email, password } = req.body;
        const pliot = await findPilotByEmail({email});
        if (!pliot || !(await Pilot.comparePasswords(password, pliot.password))) {
            return res.status(400).json({
            status: 'fail',
            message: 'Invalid Email or password',
          });;
        }
        const { access_token, refresh_token } = await signTokens(pliot);

        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.cookie('logged_in', true, {
        httpOnly: false,
        });
    
        res.status(200).json({
        status: 'success',
        access_token,
        });
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as loginPilot }