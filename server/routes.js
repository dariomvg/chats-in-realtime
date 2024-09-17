import { Router } from "express";
import { sql } from "./configDB.js";
export const router = Router();

router.get("/chats", async (req, res) => {
  try {
    const chats = await sql`SELECT * FROM chats`;
    return res.json(chats);
  } catch (error) {
    console.error("Error al recuperar los chats", error);
  }
});

router.post("/unique-chat", async (req, res) => {
  const { id } = req.body;

  try {
    const chat = await sql`SELECT * FROM chats WHERE id=${id}`;
    return res.json(chat);
  } catch (error) {
    console.error("Error al recuperar el chat", error);
  }
});

router.post("/delete-chat", async (req, res) => {
  const { id } = req.body;

  try {
    const chat = await sql`DELETE FROM chats WHERE id=${id}`;
    return res.json(chat);
  } catch (error) {
    console.error("Error al eliminar el chat", error);
  }
});

router.post("/create-chat", async (req, res) => {
  const { title, password, creator } = req.body;

  try {
    const newChat =
      await sql`INSERT INTO chats (title, password, creator) VALUES (${title},${password},${creator})`;
    return res.json({ status: "chat creado correctamente" });
  } catch (error) {
    console.error("Error al crear chat", error);
  }
});
