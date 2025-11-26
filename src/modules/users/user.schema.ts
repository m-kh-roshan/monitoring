import { Pick, Type } from "@sinclair/typebox";
import { answerObjectSchema } from "../../utilities/public.schema.js";
import { profile } from "console";

const userFields = {
    username: Type.String({minLength: 3}),
    email: Type.Optional(Type.String({format: "email"})),
    password: Type.String({minLength: 8}),
    telegramChatId: Type.Optional(Type.String()),
    phoneNumber: Type.Optional(Type.String()),
    is_email_confirmed: Type.Optional(Type.Boolean()),
    is_phone_confirmed: Type.Optional(Type.Boolean()),
    is_telgram_confirmed: Type.Optional(Type.Boolean()),
    active_channel: Type.Optional(Type.String())
}

const UserObjectSchema = Type.Object(userFields);

export const UserSchema = {
    createUser: {
        body: UserObjectSchema,
        response: {
            201: answerObjectSchema
        }
    },
    loginUser: {
        body: Pick(UserObjectSchema, ['username', 'password']),
        response: {
            200: answerObjectSchema
        }
    },
    updateUser: {
        body: UserObjectSchema,
        response: {
            200: answerObjectSchema
        }
    },
    profile: {
        params: Type.Object({
            id: Type.String()
        }),
        response: {
            200: Type.Object({
                _id: Type.String(),
                username: Type.String(),
                email: Type.Optional(Type.String()),
                telegramChatId: Type.Optional(Type.String()),
                phoneNumber: Type.Optional(Type.String())
            })
        }
    }
}