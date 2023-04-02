import connection from "../database.js";

export function validatePatientExists(email){
    return connection.query(
        `SELECT * FROM patient WHERE email=$1`,
        [email]
    );
}

export function insertPatient(email, name, encryptedPassword, phone, cpf){
    return connection.query(
        `INSERT INTO patient (email, name, password, phone, cpf) VALUES ($1, $2, $3, $4, $5)`,
        [email, name, encryptedPassword, phone, cpf]
    );
}

export function findPatient(email,password){
    return connection.query(
        `SELECT * FROM patient WHERE email=$1 AND password=$2`,
        [email, password]
    );
}