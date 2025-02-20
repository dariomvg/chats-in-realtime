import {config} from "dotenv"
config();

export default {
    PORT:  process.env.PORT ?? 4000,
    host:  process.env.ACCESS_HOST,
    database:  process.env.ACCESS_DATABASE,
    username:  process.env.ACCESS_USERNAME,
    password:  process.env.ACCESS_PASSWORD
}
