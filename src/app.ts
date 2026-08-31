import express from "express";
import dotenv from "dotenv";

import telegramRoutes from "./routes/telegram.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Telegram API is running",
    });
});

app.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "OK",
    });
});

app.use("/api/telegram", telegramRoutes);

export default app;