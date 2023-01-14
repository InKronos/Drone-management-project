import express from "express";


const router = express.Router();

router.get('/api/logout', async (req, res, next) => {
    try{
    

        res.cookie('access_token', '', { maxAge: -1 });
        res.cookie('refresh_token', '', { maxAge: -1 });
        res.cookie('logged_in', '', { maxAge: -1 });
        
        res.status(200).json({
        status: 'success'
        });
    } 
    catch (err: any) {
        next(err);
    }
});


export {router as logoutPilot }