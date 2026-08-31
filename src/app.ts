import express from "express";
import dotenv from "dotenv";

import messageRoutes from "./routes/message.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "API is running",
    });
});

app.use("/api/messages", messageRoutes);

export default app;