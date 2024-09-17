import express from "express";
import { sql } from "./configDB.js";
import { app, io, PORT, server } from "./config.index.js";
import { router } from "./routes.js";
import cors from "cors";
import { failure, success } from "./utils/response-object.js";

app.use(cors());
app.use(express.json());
app.use(router);

io.on("connection", async (socket) => {
  socket.on("initialData", async (chatId, callback) => {
    try {
      const messages = await sql`SELECT * FROM messages WHERE chatId=${chatId}`;
      if (messages.length > 0) {
        callback(messages);
      } else {
        console.log("Error fetching initial");
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(
    "access_chat",
    async ({ password, chatId, user: username }, callback) => {
      try {
        const chat = await sql`SELECT * FROM chats WHERE id=${chatId}`;
        const userFound =
          await sql`SELECT * FROM users WHERE username=${username} AND userId=${chatId}`;

        if (chat[0] && userFound.length > 0) {
          callback(success);
        } else if (chat[0] && chat[0].password === password) {
          await sql`INSERT INTO users (userId, username) VALUES (${chat[0].id}, ${username})`;
          callback(success);
        } else {
          callback(failure);
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("send_message", async ({ chatId, newMsg }) => {
    try {
      if (!chatId || !newMsg || !newMsg.username || !newMsg.message) {
        throw new Error("chatId or newMsg is missing or invalid");
      }
      await sql`INSERT INTO messages (username, messages, chatId) VALUES (${newMsg.username}, ${newMsg.message}, ${chatId})`;
      socket.to(chatId).broadcast.emit("message", newMsg);
    } catch (error) {
      console.error("Error inserting data", error);
    }
  });
});

server.listen(PORT, () => console.log("on port ", PORT));
