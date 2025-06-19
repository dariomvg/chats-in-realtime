import { Router } from "express";
import { sql } from "../options/config.db.js";
import {deleteAllAudios} from "../controllers/deleteAllAudios.js"
export const router = Router();

router.get("/chats", async (req, res) => {
  const { creator } = req.query;
  try {
    const chats = await sql`SELECT * FROM chats WHERE creator=${creator}`;
    return res.json(chats);
  } catch (error) {
    console.error("Error al recuperar los chats", error);
  }
});

router.get("/global-chats", async (req, res) => {
  try {
    const chats = await sql`SELECT * FROM chats WHERE global=true`;
    return res.json(chats);
  } catch (error) {
    console.error("Error al recuperar los chats globales", error);
  }
});

router.get("/unique-chat", async (req, res) => {
  const { id } = req.query;

  try {
    const chat = await sql`SELECT * FROM chats WHERE id=${id}`;
    if (chat.length === 0) {
      res.json({
        ok: false,
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
    await deleteAllAudios(id);
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
  const { title, creator, description, global, date } = req.body;

  try {
    await sql`INSERT INTO chats (title, creator, description, global, date) VALUES (${title},${creator},${description},${global},${date})`;
    return res.json({ status: "chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat", error);
  }
});

router.post("/change-global", async (req, res) => {
  const { global, id } = req.body;

  try {
    await sql`UPDATE chats SET global=${global} WHERE id=${id};`;
    return res.json({ status: "chat actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar chat", error);
  }
});
