import { Request, Response } from "express";
import { handleTelegramMessage } from "../services/telegram.service";

export const telegramWebhook = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        await handleTelegramMessage(req.body);

        // Telegram expects a successful response.
        res.sendStatus(200);
    } catch (error) {
        console.error(
            "Telegram webhook processing failed:",
            error
        );

        res.sendStatus(500);
    }
};