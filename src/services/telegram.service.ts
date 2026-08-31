import axios from "axios";

const sendTelegramMessage = async (message: string): Promise<void> => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error("Telegram configuration is missing");
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios.post(url, {
        chat_id: chatId,
        text: message,
    });
};

export default sendTelegramMessage;