import { Router } from "express";
import { doctorSignIn, doctorSignUp } from "../controllers/doctorAuthControllers.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { doctorSignInValidate, doctorSignUpValidate } from "../middlewares/doctorAuthMiddlewares.js";
import {doctorSignUpSchema, doctorSignInSchema} from "../schemas/doctor.schema.js";



const router=Router();

router.post('/doctor/sign-up', processRequestParams(doctorSignUpSchema), doctorSignUpValidate, doctorSignUp);
router.post('/doctor/', processRequestParams(doctorSignInSchema), doctorSignInValidate, doctorSignIn);

export default router;