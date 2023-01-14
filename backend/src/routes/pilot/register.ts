import express from "express";
import { createPilot } from "../../services/pilot.service";


const router = express.Router();

router.post('/api/register', async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, password, email, phone_number } = req.body;
    
        const pilot = await createPilot(
          name,
          email,
          password,
          phone_number
        );
    
        res.status(201).json({
          status: 'success',
          data: {
            pilot,
          },
        });
      } catch (err) {
        if (err.code === '23505') {
          return res.status(409).json({
            status: 'fail',
            message: 'User with that email already exist',
          });
        }
        next(err);
      }
});


export {router as registerPilot }