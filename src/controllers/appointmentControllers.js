import { STATUS_CODE } from "../utils/statusCode.js";
import { doctorAppointment, patientAppointment } from "../repositories/appointmentRepositories.js";

export async function getAppointment(req, res) {
    const category=res.locals.category;
    const userId=res.locals.userId;

    if(category==="d"){
        try{
            const results = await doctorAppointment(userId);
            
            return res.status(STATUS_CODE.OK).send(results);
        }catch(err){
            return res.status(STATUS_CODE.SERVER_ERROR).send(err);
        }
    }else{
        if(category==="p"){
            try{
                const results = await patientAppointment(userId);
            
                return res.status(STATUS_CODE.OK).send(results);
            }catch(err){
                return res.status(STATUS_CODE.SERVER_ERROR).send(err);
            }
        }else{
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }
    }

}