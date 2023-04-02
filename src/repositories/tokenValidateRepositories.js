import connection from "../database.js";

export function isDoctor(userId){
    return connection.query(
        `SELECT * FROM doctor WHERE id=$1`,
        [userId]
    );
}

export function isPatient(userId){
    return connection.query(
        `SELECT * FROM patient WHERE id=$1`,
        [userId]
    );
}