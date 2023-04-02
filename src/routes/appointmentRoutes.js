import { Router } from "express";
import { getAppointment } from "../controllers/appointmentControllers.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";

const router=Router();

router.get('/appointment', tokenValidate, getAppointment);

export default router;