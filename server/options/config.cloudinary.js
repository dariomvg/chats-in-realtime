import { v2 as cloudinary } from "cloudinary";
const { cloud_name, api_secret, api_key } = configEnv
import configEnv from "./config.env.js";

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export {cloudinary}