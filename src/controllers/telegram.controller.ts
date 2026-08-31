import { Request, Response } from "express";
import { handleTelegramMessage } from "../services/telegram.service";

export const telegramWebhook = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const secret = req.headers[
            "x-telegram-bot-api-secret-token"
        ];

        const expectedSecret =
            process.env.TELEGRAM_WEBHOOK_SECRET;

        if (!expectedSecret) {
            console.error(
                "TELEGRAM_WEBHOOK_SECRET is missing"
            );

            res.sendStatus(500);

            return;
        }

        if (secret !== expectedSecret) {
            console.warn(
                "Invalid Telegram webhook secret"
            );

            res.sendStatus(401);

            return;
        }

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