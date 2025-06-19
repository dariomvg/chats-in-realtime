import { sql } from "../options/config.db.js";
import { uploadAudioToCloudinary } from "./uploadAudioToCloudinary.js";


export const selectMessages = async (chatId) => {
  const messages = await sql`SELECT * FROM messages WHERE chatId=${chatId}`;
  return messages;
};

export const selectChat = async (chatId) => {
  const chat = await sql`SELECT * FROM chats WHERE id=${chatId}`;
  return chat;
};

export const selectUser = async (chatId, username) => {
  const user =
    await sql`SELECT * FROM users WHERE username=${username} AND userId=${chatId}`;
  return user;
};

export const insertUsers = async (id, username) => {
  await sql`INSERT INTO users (userId, username) VALUES (${id}, ${username})`;
};

export const insertMessage = async (chatId, newMsg) => {
  const { username, content, date, type } = newMsg;
  const message =
    await sql`INSERT INTO messages (username, content, chatId, date, type) VALUES (${username}, ${content}, ${chatId}, ${date}, ${type}) RETURNING *`;
  return message;
};

export const insertMessageAudio = async (chatId, newMsg) => {
  try {
    const { username, content, date, type } = newMsg;

    const buffer = Buffer.from(content);
    const audio = await uploadAudioToCloudinary(buffer, chatId);
    const message =
      await sql`INSERT INTO messages (username, content, chatId, date, type, id_audio) VALUES (${username}, ${audio.url}, ${chatId}, ${date}, ${type}, ${audio.id}) RETURNING *`;
    return message;
  } catch (error) {
    console.log("Error al subir audio", error);
  }
};


