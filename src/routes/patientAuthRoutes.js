import { Router } from "express";
import { patientSignIn, patientSignUp } from "../controllers/patientAuthControllers.js";
import { patientSignInMiddleware, patientSignUpMiddleware } from "../middlewares/patientAuthMiddlewares.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { patientSignInSchema, patientSignUpSchema } from "../schemas/patient.schema.js";

const router=Router();

router.post('/patient/sign-up', processRequestParams(patientSignUpSchema), patientSignUpMiddleware, patientSignUp);
router.post('/patient/', processRequestParams(patientSignInSchema), patientSignInMiddleware, patientSignIn);

export default router;