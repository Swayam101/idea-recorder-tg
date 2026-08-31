import { Request, Response } from "express";
import Message from "../models/Message";
import sendTelegramMessage from "../services/telegram.service";

export const createMessage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { message } = req.body;

        if (!message) {
            res.status(400).json({
                success: false,
                message: "Message is required",
            });
            return;
        }

        // Save to MongoDB
        const savedMessage = await Message.create({
            message,
        });

        // Send to Telegram
        await sendTelegramMessage(message);

        res.status(201).json({
            success: true,
            message: "Message saved and sent to Telegram",
            data: savedMessage,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};