import { STATUS_CODE } from "../utils/statusCode.js";
import bcrypt from 'bcrypt';
import { validatePatientExists } from "../repositories/patientAuthRepositories.js";

export async function patientSignInMiddleware(req, res, next) {
    const {email, password}= req.body;
    
    let patientSignInData;

    try{
        const patientExists= await validatePatientExists(email);
        
        if(patientExists.rowCount===0){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        const passwordCorrect= bcrypt.compareSync(password, patientExists.rows[0].password);

        if(!passwordCorrect){
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        if(patientExists.rowCount>0 && passwordCorrect){
            patientSignInData={
                email: email,
                password: patientExists.rows[0].password,
                id: patientExists.rows[0].id
            }
        }
        
        res.locals=patientSignInData;
        next();
    }catch (err) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}

export async function patientSignUpMiddleware(req, res, next) {
    const patient = req.body;
    
    try{
        const patientExists=await validatePatientExists(patient.email);
        
        if(patientExists.rowCount>0){
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }
        
        res.locals=patient;
        next();
    }catch(err) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
} 