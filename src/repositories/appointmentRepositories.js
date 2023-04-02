import connection from "../database.js";

export function doctorAppointment(userId){
    return connection.query(
        `SELECT * FROM appointment WHERE doctor_id=$1`,
        [userId]
    )
}

export function patientAppointment(userId){
    return connection.query(
        `SELECT * FROM appointment WHERE patient_id=$1`,
        [userId]
    )
}