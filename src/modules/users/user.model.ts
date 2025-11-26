import { Enum } from "@fastify/type-provider-typebox";
import {Schema, model} from "mongoose";

export interface IUser {
    username: string;
    email?: string;
    password: string;
    telegramChatId?: string;
    phoneNumber?: string;
    is_email_confirmed: boolean;
    is_phone_confirmed: boolean;
    is_telegram_confirmed: boolean;
    active_channel: string | undefined;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
    },
    telegramChatId: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    is_email_confirmed: {
        type: Boolean,
        default: false
    },
    is_phone_confirmed: {
        type: Boolean,
        default: false
    },
    is_telegram_confirmed: {
        type: Boolean,
        default: false
    },
    active_channel: {
        type: String,
        enum: ['sms', 'email', 'telegram']
    }
})
UserSchema.index({email: 1}, {unique: true, sparse: true})

export const User = model<IUser>("User", UserSchema)