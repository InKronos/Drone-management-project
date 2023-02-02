import express from "express";
import { deletePilot, findPilotById } from "../../services/pilot.service";
import { verifyJwt } from "../../utils/jwt";


const router = express.Router();

router.post('/api/delete', async (req, res, next) => {
    try{
        
        const { token } = req.body;
        
        const sub = verifyJwt(token);
        if(sub !== undefined && sub !== null){
            let id = parseInt(sub);
            const pliot = await findPilotById({id: id});
            if (pliot !== null) await deletePilot(pliot);
            res.status(200).json(true);
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


export {router as deletePilot}