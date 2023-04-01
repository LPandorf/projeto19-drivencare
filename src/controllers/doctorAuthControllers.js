import bcrypt from 'bcrypt';
import { STATUS_CODE } from '../utils/statusCode.js';
import { findDoctor, insertDoctor } from '../repositories/doctorAuthRepositories.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function doctorSingIn(req, res) {
    const {email, password, id, specialty}= res.locals;
    const secret=process.env.SECRET_KEY;

    const payload={userId:id, specialty:specialty};

    const token=jwt.sign(payload,secret);

    try{
        await findDoctor(email,password);

        return res.status(STATUS_CODE.OK).send({token});
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}

export async function doctorSingUp(req, res) {
    const {email, password, name, specialty, crm, crm_state, phone}=res.locals;
    const encryptedPassword=bcrypt.hashSync(password,12);

    try{
        await insertDoctor(email,encryptedPassword, name, specialty, crm, crm_state, phone);

        return res.sendStatus(STATUS_CODE.CREATED);
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}

