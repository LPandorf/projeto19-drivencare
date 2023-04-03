import connection from "../database.js";

export function doctorAppointment(userId){
    return connection.query(
        `SELECT * FROM appointment WHERE doctor_id=$1`,
        [userId]
    );
}

export function patientAppointment(userId){
    return connection.query(
        `SELECT * FROM appointment WHERE patient_id=$1`,
        [userId]
    );
}

// JOIN name FROM doctor WHERE id=doctor_id`

export function checkDisponibility(date, hour, doctor_id){
    return connection.query(
        `SELECT * FROM appointment WHERE date=$1 AND hour=$2 AND doctor_id=$3`,
        [date, hour, doctor_id]
    );
}

export function scheduling(hour, date, doctor_id, userId){
    return connection.query(
        `INSERT INTO appointment (hour, date, doctor_id, user_id) VALUES ($1, $2, $3, $4)`,
        [hour, date, doctor_id, userId]
    );
}

export function checkAppointment(id){
    return connection.query(
        `SELECT * FROM appointment WHERE id=$1`,
        [id]
    );
}

export function statusAppointment (id, status){
    return connection.query(
        `UPDATE appointment SET status=$1 WHERE id=$2`,
        [status, id]
    );
}