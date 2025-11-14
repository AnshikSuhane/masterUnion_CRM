import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import listenToSupabaseEvents from "./events/supabaseListeners";
import leadroutes from "./routes/leads.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/leads", leadroutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

listenToSupabaseEvents(io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Backend listening on ${PORT}`);
});
