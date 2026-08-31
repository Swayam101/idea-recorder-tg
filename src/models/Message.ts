import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    telegramMessageId: number;
    telegramUserId?: number;
    chatId: number;

    username?: string;
    firstName?: string;
    lastName?: string;

    message: string;

    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        telegramMessageId: {
            type: Number,
            required: true,
        },

        telegramUserId: {
            type: Number,
        },

        chatId: {
            type: Number,
            required: true,
        },

        username: {
            type: String,
            trim: true,
        },

        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;