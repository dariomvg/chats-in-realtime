import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});
