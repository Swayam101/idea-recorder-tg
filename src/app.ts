import express from "express";
import dotenv from "dotenv";

import telegramRoutes from "./routes/telegram.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "API is running",
    });
});

app.use("/api/telegram", telegramRoutes);

export default app;