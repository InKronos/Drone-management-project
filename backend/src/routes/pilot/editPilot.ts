import express from "express";
import { verifyJwt } from "../../utils/jwt";
import { createPilot, editPilot, findPilotById } from "../../services/pilot.service";


const router = express.Router();

router.post('/api/edit', async (req, res, next) => {
    try {
            const { token, name, password, email, phone_number } = req.body;
            
            const sub = verifyJwt(token);
            if(sub !== undefined && sub !== null){
            const pilot = await findPilotById({id: parseInt(sub)})
            if(pilot !== null){
                name === "" ? pilot.full_name =  pilot.full_name : pilot.full_name = name;
                password === "" ? pilot.password =  pilot.password : pilot.password = name;
                email === "" ? pilot.email =  pilot.email : pilot.email = name;
                phone_number === "" ? pilot.phone_number =  pilot.phone_number : pilot.phone_number = name;
                await editPilot(pilot);
                res.status(200).json({
                status: 'success'
                });
            }
            else{
                res.status(400).json({
                    status: 'fail',
                    message: 'user not found'
                    });
            }
            
         }
         res.status(400).json({
            status: 'fail',
            message: 'user not found'
            });
      } catch (err) {
        next(err);
      }
});


export {router as editPilot }