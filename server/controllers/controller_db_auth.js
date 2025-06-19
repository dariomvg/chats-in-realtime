import { sql } from "../options/config.db.js";

export const findUser = async (name) => {
    const user = await sql`SELECT username FROM users_auth WHERE username=${name}`; 
    return user[0]; 
}

export const insertUser = async (username, password) => {
    const data = await sql`INSERT INTO users_auth (username, password) VALUES (${username}, ${password}) RETURNING username`;
    return data[0]; 
}

export const selectUser = async (username) => {
    const data = await sql`SELECT * FROM users_auth WHERE username=${username}`;
    return data[0]; 
}