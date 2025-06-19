import express from "express";
import cors from "cors";
import configEnv from "./options/config.env.js";
import { router } from "./routes/routes.js";
import { routerAuth } from "./routes/routes.auth.js";
import { app, io, server } from "./options/config.index.js";
import cookieParser from "cookie-parser";
import {
  insertMessage,
  insertMessageAudio,
  insertUsers,
  selectChat,
  selectMessages,
  selectUser,
} from "./controllers/controller_db.js";
const { PORT } = configEnv;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(routerAuth);

io.on("connection", async (socket) => {
  socket.on("initial_data", async (chatId, callback) => {
    try {
      const messages = await selectMessages(chatId);
      callback(messages);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join_chat", async ({ chatId, username }, callback) => {
    try {
      const chat = await selectChat(chatId);
      const user = await selectUser(chatId, username);
      if (chat[0] && user.length > 0) {
        socket.join(chatId);
        callback({ ok: true, msg: "Te uniste al chat" });
      } else if (chat[0] && !user.length > 0) {
        await insertUsers(chat[0].id, username);
        socket.join(chatId);
        callback({ ok: true, msg: "Te uniste al chat" });
      }
    } catch (error) {
      console.log(error);
    }
  });


  socket.on("send_message", async ({ chatId, newMsg }) => {
    try {
      if (!chatId || !newMsg || !newMsg.username || !newMsg.content) {
        console.log(newMsg)
        throw new Error("chatId o newMsg no existe o es inválido");
      }
      if (newMsg.type === "audio") {
        const message = await insertMessageAudio(chatId, newMsg);
        io.to(chatId).emit("message", message[0]);
      } else {
        const message = await insertMessage(chatId, newMsg);
        io.to(chatId).emit("message", message[0]);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
