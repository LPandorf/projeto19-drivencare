import connection from "../database.js";

export function searchBy(data){
    return connection.query(
        `SELECT * FROM doctor WHERE name=$1 or specialty=$1 or crm_state=$1`,
        [data]
    );
}