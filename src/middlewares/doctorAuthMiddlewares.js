import {STATUS_CODE} from "../utils/statusCode.js";
import { validateDoctorExists } from "../repositories/doctorAuthRepositories.js";
import bcrypt from "bcrypt";

/* import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); */


export async function doctorSignInValidate(req, res, next) {
    const {email,password} = req.body;

    let doctorSignInData;

    try{
        const doctorExists= await validateDoctorExists(email);

        if(doctorExists.rowCount===0){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const passwordCorrect=bcrypt.compareSync(password, doctorExists.rows[0].password);

        if(!passwordCorrect){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        if(doctorExists.rowCount>0 && passwordCorrect){
            doctorSignInData={
                email: email,
                password: doctorExists.rows[0].password,
                id: doctorExists.rows[0].id,
                specialty: doctorExists.rows[0].specialty
            };
        }

        res.locals=doctorSignInData;
        next();
    }catch (err) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
};

export async function doctorSignUpValidate(req, res, next) {
    const doctor=req.body;

    try{
        const doctorExists= await validateDoctorExists(doctor.email);
        
        if(doctorExists.rowCount>0){
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }

        res.locals=doctor;
        next();
    }catch (err) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
};
