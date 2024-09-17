import postgres from "postgres";

export const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "realtime",
    username: "postgres",
    password: "1917",
  });