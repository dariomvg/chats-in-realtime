import { sql } from "../config.db.js";

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

export const insertUsers = async (chat, username) => {
  await sql`INSERT INTO users (userId, username) VALUES (${chat[0].id}, ${username})`;
};

export const insertMessage = async (chatId, newMsg) => {
  const message =
    await sql`INSERT INTO messages (username, messages, chatId) VALUES (${newMsg.username}, ${newMsg.message}, ${chatId}) RETURNING *`;
  return message;
};
