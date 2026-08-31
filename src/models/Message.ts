import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    message: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
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