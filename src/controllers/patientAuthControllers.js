import bcrypt from 'bcrypt';
import { STATUS_CODE } from '../utils/statusCode.js';
import { findPatient, insertPatient } from '../repositories/patientAuthRepositories.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function patientSignIn(req, res){
    const {email, password, id}=res.locals;
    const secret=process.env.SECRET_KEY;
    
    const payload={userId:id};
    
    const token=jwt.sign(payload, secret);

    try{
        await findPatient(email, password);
        
        return res.status(STATUS_CODE.OK).send({token});
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}

export async function patientSignUp(req, res) {
    const {email, name, password, phone, cpf}=res.locals;
    
    const encryptedPassword=bcrypt.hashSync(password,12);
    
    try{
        await insertPatient(email, name, encryptedPassword, phone, cpf);
        
        return res.sendStatus(STATUS_CODE.CREATED);
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}