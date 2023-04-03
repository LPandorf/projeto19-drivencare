import { STATUS_CODE } from "../utils/statusCode";
import { checkDisponibility, checkAppointment } from "../repositories/appointmentRepositories.js";

export async function isAvailable (req, res, next) {
    const {date, hour, doctor_id}=req.body;
    const {userCategory} = res.locals.category;

    if(userCategory==="d"){
        return res.status(STATUS_CODE.UNAUTHORIZED).send("You need to have a patient account to schedule a appointment");
    }
    
    try{
        const isTaken = await checkDisponibility(date, hour, doctor_id);
        if(isTaken.rowCount>0){
            return res.status(STATUS_CODE.CONFLICT).send("Is not available");
        }

        next();
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}

export async function appointmentExists(req, res, next){
    const {userCategory} = res.locals.category;
    const {id}= res.params

    if(userCategory==="p"){
        return res.status(STATUS_CODE.UNAUTHORIZED).send("You need a doctor account to access this");
    }

    try{
        const appointment=await checkAppointment(id);

        if(appointment.rowCount===0){
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        next();
    }catch(err){
        return res.status(STATUS_CODE.SERVER_ERROR).send(err);
    }
}