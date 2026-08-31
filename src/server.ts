import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import connectDB from "./config/db";
import { setupTelegramWebhook } from "./services/telegram.service";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
    try {
        // Connect MongoDB
        await connectDB();

        // Check and configure Telegram webhook
        await setupTelegramWebhook();

        // Start Express
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);

        process.exit(1);
    }
};

export default startServer;