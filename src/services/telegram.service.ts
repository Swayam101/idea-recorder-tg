import axios from "axios";
import Message from "../models/Message";

interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name?: string;
    last_name?: string;
    username?: string;
}

interface TelegramChat {
    id: number;
    type: string;
    first_name?: string;
    last_name?: string;
    username?: string;
}

interface TelegramMessage {
    message_id: number;
    from?: TelegramUser;
    chat: TelegramChat;
    date: number;
    text?: string;
}

interface TelegramUpdate {
    update_id: number;
    message?: TelegramMessage;
}

const getTelegramApiUrl = (): string => {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        throw new Error("TELEGRAM_BOT_TOKEN is missing");
    }

    return `https://api.telegram.org/bot${token}`;
};

/**
 * Check the current Telegram webhook.
 *
 * If it is not configured or points to a different URL,
 * automatically configure the correct webhook.
 */
export const setupTelegramWebhook = async (): Promise<void> => {
    const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("TELEGRAM_WEBHOOK_URL is missing");
    }

    const telegramApiUrl = getTelegramApiUrl();

    try {
        console.log("Checking Telegram webhook...");

        const response = await axios.get(
            `${telegramApiUrl}/getWebhookInfo`
        );

        const currentWebhookUrl = response.data?.result?.url;

        if (currentWebhookUrl === webhookUrl) {
            console.log("Telegram webhook already configured");
            console.log(`Webhook: ${webhookUrl}`);

            return;
        }

        console.log("Telegram webhook needs to be configured");

        if (currentWebhookUrl) {
            console.log(`Current webhook: ${currentWebhookUrl}`);
        } else {
            console.log("No Telegram webhook configured");
        }

        console.log(`Setting webhook: ${webhookUrl}`);

        await axios.post(
            `${telegramApiUrl}/setWebhook`,
            {
                url: webhookUrl,
                allowed_updates: ["message"],
            }
        );

        console.log("Telegram webhook configured successfully");
    } catch (error) {
        console.error("Telegram webhook setup failed:", error);

        throw error;
    }
};

/**
 * Handle an incoming Telegram webhook update.
 */
export const handleTelegramMessage = async (
    update: TelegramUpdate
): Promise<void> => {
    const telegramMessage = update.message;

    // Ignore updates that don't contain a message.
    if (!telegramMessage) {
        console.log("Telegram update does not contain a message");

        return;
    }

    // Ignore messages without text.
    if (!telegramMessage.text) {
        console.log("Telegram message does not contain text");

        return;
    }

    const savedMessage = await Message.create({
        telegramMessageId: telegramMessage.message_id,

        telegramUserId: telegramMessage.from?.id,

        chatId: telegramMessage.chat.id,

        username: telegramMessage.from?.username,

        firstName: telegramMessage.from?.first_name,

        lastName: telegramMessage.from?.last_name,

        message: telegramMessage.text,
    });

    console.log(
        `Telegram message saved: ${savedMessage._id}`
    );
};