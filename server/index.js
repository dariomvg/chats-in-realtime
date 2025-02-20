import express from "express";
import cors from "cors";
import configEnv from "./config.env.js";
import { router } from "./routes.js";
import { app, io, server } from "./config.index.js";
import { failure, success } from "./utils/response-object.js";
import {
  insertMessage,
  insertUsers,
  selectChat,
  selectMessages,
  selectUser,
} from "./services/queries.js";
const { PORT } = configEnv;

app.use(cors());
app.use(express.json());
app.use(router);

io.on("connection", async (socket) => {
  socket.on("initial_data", async (chatId, callback) => {
    try {
      const messages = await selectMessages(chatId);
      if (messages.length > 0) callback(messages);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join_chat", async ({ password, chatId, username }, callback) => {
    try {
      const chat = await selectChat(chatId);
      const user = await selectUser(chatId, username);
      if (chat[0] && user.length > 0 && chat[0].password === password) {
        socket.join(chatId);
        callback(success);
      } else if (chat[0] && chat[0].password === password && !user.length > 0) {
        await insertUsers(chat, username);
        socket.join(chatId);
        callback(success);
      } else {
        callback(failure);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send_message", async ({ chatId, newMsg }) => {
    try {
      if (!chatId || !newMsg || !newMsg.username || !newMsg.message) {
        throw new Error("chatId o newMsg no existe o es inválido");
      }
      const message = await insertMessage(chatId, newMsg);
      io.to(chatId).emit("message", message[0]);
    } catch (error) {
      console.log("Error al insertar mensaje", error);
    }
  });
});

server.listen(PORT, () => console.log("On:", `http://localhost:${PORT}`));
