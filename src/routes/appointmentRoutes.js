import { Router } from "express";
import { getAppointment, postAppointment, updateAppointmentStatus } from "../controllers/appointmentControllers.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";
import { appointmentExists, isAvailable } from "../middlewares/appointmentMiddlerares.js";

const router=Router();

router.get('/appointment', tokenValidate, getAppointment);
router.post('/appointment', tokenValidate, isAvailable, postAppointment);
router.put('/appointment/:id', tokenValidate, appointmentExists, updateAppointmentStatus);

export default router;