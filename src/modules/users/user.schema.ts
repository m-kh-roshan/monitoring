import { Pick, Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema } from "../../utilities/public.schema.js";


export const createUserSchema = {
    body: Type.Object({
        username: Type.String({minLength: 3}),
        email: Type.Optional(Type.String({format: "email"})),
        password: Type.String({minLength: 8}),
        telegramChatId: Type.Optional(Type.String()),
        phoneNumber: Type.Optional(Type.String()),
        is_email_confirmed: Type.Optional(Type.Boolean()),
        is_phone_confirmed: Type.Optional(Type.Boolean()),
        is_telgram_confirmed: Type.Optional(Type.Boolean()),
        active_channel: Type.Optional(Type.String())
    }),
    response: {
        201: answerObjectSchema
    }
};

export const loginUserSchema = {
    body: Pick(createUserSchema.body, ['username', 'password']),
    response: {
        200: answerObjectSchema
    }
};

export const updateUserSchema = {
    params: {
        id: Type.String()
    },
    body: createUserSchema.body,
    response: {
        200: answerObjectSchema
    }
};

export type CreateUserDto = Static<typeof createUserSchema.body>;
export type LoginUserDto = Static<typeof loginUserSchema.body>;

// export const UserSchema = {
    
//     profile: {
//         params: Type.Object({
//             id: Type.String()
//         }),
//         response: {
//             200: Type.Object({
//                 _id: Type.String(),
//                 username: Type.String(),
//                 email: Type.Optional(Type.String()),
//                 telegramChatId: Type.Optional(Type.String()),
//                 phoneNumber: Type.Optional(Type.String())
//             })
//         }
//     }
// }