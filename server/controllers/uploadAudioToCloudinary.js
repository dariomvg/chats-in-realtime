import { Readable } from "stream";
import {cloudinary} from "../options/config.cloudinary.js"

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

export const uploadAudioToCloudinary = async (buffer, chatId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        public_id:`audios_${chatId}/${Date.now()}` ,
        folder: "audios",
        format: "webm",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, id: result.public_id });
      }
    );

    bufferToStream(buffer).pipe(stream);
  });
};