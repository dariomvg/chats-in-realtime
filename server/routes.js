import { Router } from "express";
import { sql } from "./config.db.js";
export const router = Router();

router.get("/chats", async (req, res) => {
  try {
    const chats = await sql`SELECT * FROM chats`;
    return res.json(chats);
  } catch (error) {
    console.error("Error al recuperar los chats", error);
  }
});

router.get("/unique-chat", async (req, res) => {
  const { id } = req.query;

  try {
    const chat = await sql`SELECT * FROM chats WHERE id=${id}`;
    if (chat.length === 0) {
      res.json({
        ok: flase,
        message: "Error al recuperar chat, intenta más tarde",
      });
    }
    return res.json(chat);
  } catch (error) {
    console.error("Error al recuperar el chat", error);
  }
});

router.delete("/delete-chat", async (req, res) => {
  const { id, username } = req.query;

  try {
    const chat =
      await sql`DELETE FROM chats WHERE id=${id} AND creator=${username} RETURNING *`;

    if (chat.length === 0) {
      return res.json({
        ok: false,
        message: "Usuario sin permiso de eliminación",
      });
    }
    return res.json({ ok: true, message: "Chat eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el chat", error);
  }
});

router.post("/create-chat", async (req, res) => {
  const { title, password, creator } = req.body;

  try {
    await sql`INSERT INTO chats (title, password, creator) VALUES (${title},${password},${creator})`;
    return res.json({ status: "chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat", error);
  }
});
