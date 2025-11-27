import {Schema, Types, model} from "mongoose";

// ==========
// USERS
// ==========
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

// ====================
// USER VERIFICATIONS
// ====================
export interface IUserVerification{
    channel: string,
    user_id: Types.ObjectId,
    token: string,
    expiresAt: Date
}

const userVerificationSchema = new Schema<IUserVerification>({
    channel: {
        type: String,
        enum: ["sms", "email", "telegram"],
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 3600*1000)
    }
},{
    timestamps: true
});

userVerificationSchema.index({token: 1});

export const UserVerify = model<IUserVerification>("UserVerify", userVerificationSchema);