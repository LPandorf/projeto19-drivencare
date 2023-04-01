import connection from "../database.js";

export function validateDoctorExists(email){
    return connection.query(
        `SELECT * FROM doctor WHERE email=$1`,
        [email]
    );
}

export function insertDoctor(email,encryptedPassword, name, specialty, crm, crm_state, phone){
    return connection.query(
        `INSERT INTO doctor (email, password, name, specialty, phone, crm, crm_state) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [email, encryptedPassword, name, specialty, phone, crm, crm_state]
    );
}

export function findDoctor(email,password){
    return connection.query(
        `SELECT * FROM doctor WHERE email=$1 AND password=$2`,
        [email, password]
    );
}