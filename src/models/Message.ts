import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    telegramUserId: number;
    username?: string;
    firstName?: string;
    message: string;
    chatId: number;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        telegramUserId: {
            type: Number,
            required: true,
        },

        username: {
            type: String,
        },

        firstName: {
            type: String,
        },

        message: {
            type: String,
            required: true,
        },

        chatId: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IMessage>("Message", messageSchema);