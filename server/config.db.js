import postgres from "postgres";
import configEnv from "./config.env.js";
const {host, database, username, password} = configEnv; 

export const sql = postgres({
    host,
    port: 5432,
    database,
    username,
    password,
  });
  