import Message from "../models/Message";

interface TelegramUpdate {
    message?: {
        message_id: number;
        text?: string;
        chat: {
            id: number;
        };
        from?: {
            id: number;
            username?: string;
            first_name?: string;
        };
    };
}

export const handleTelegramMessage = async (
    update: TelegramUpdate
): Promise<void> => {
    const telegramMessage = update.message;

    // Ignore updates that don't contain a message
    if (!telegramMessage) {
        return;
    }

    // Ignore messages without text
    if (!telegramMessage.text) {
        return;
    }

    await Message.create({
        telegramUserId: telegramMessage.from?.id,
        username: telegramMessage.from?.username,
        firstName: telegramMessage.from?.first_name,
        message: telegramMessage.text,
        chatId: telegramMessage.chat.id,
    });

    console.log("Telegram message saved:", telegramMessage.text);
};