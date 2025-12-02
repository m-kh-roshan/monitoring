import { Pick, Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, idObjectParams, ResponseTokenData } from "../../utilities/public.schema.js";

// ===============
// CREATE USER
// ===============
const createUserBody = Type.Object({
    username: Type.String({minLength: 3}),
    email: Type.Optional(Type.String({format: "email"})),
    password: Type.String({minLength: 8}),
    telegramChatId: Type.Optional(Type.String()),
    phoneNumber: Type.Optional(Type.String()),
    is_email_confirmed: Type.Optional(Type.Boolean()),
    is_phone_confirmed: Type.Optional(Type.Boolean()),
    is_telgram_confirmed: Type.Optional(Type.Boolean()),
    active_channel: Type.Optional(Type.String())
});

export const createUserSchema = {
    body: createUserBody,
    response: {
        201: answerObjectSchema()
    }
};

export type CreateUserDto = Static<typeof createUserBody>;

// ===============
// lOGIN USER
// ===============
const loginUserBody = Pick(createUserBody, [
    'username', 
    'password'
]);

export const loginUserSchema = {
    body: loginUserBody,
    response: {
        200: answerObjectSchema(ResponseTokenData)
    }
};

export type LoginUserDto = Static<typeof loginUserBody>;

// ===============
// UPDATE USER
// ===============
export const updateUserSchema = {
    params: idObjectParams,
    body: createUserBody,
    response: {
        200: answerObjectSchema()
    }
};


// ===============
// USER INFO
// ===============
const userInfoResponseObject = Type.Object({
    username: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    telegramChatId: Type.Optional(Type.String()),
    phoneNumber: Type.Optional(Type.String()),
    is_email_confirmed: Type.Optional(Type.Boolean()),
    is_phone_confirmed: Type.Optional(Type.Boolean()),
    is_telgram_confirmed: Type.Optional(Type.Boolean()),
    active_channel: Type.Optional(Type.String())
});
export const userInfoSchema = {
    response: {
        200: answerObjectSchema(userInfoResponseObject)
    }
};

// ==================================
// SEND VERIFY EMAIL/SMS
// ==================================
const sendVerifyUserParams = Type.Object({
    channel: Type.String({enum: ['email', 'sms', 'telegram']})
});
export const sendVerifyUserSchema =  {
    params: sendVerifyUserParams,
    response: {
        200: answerObjectSchema()
    }
};

export type VerifyUserDto = Static<typeof sendVerifyUserParams>;

// ==================================
// const verifyUserBody = Type.Object({
//     channel: Type.String(),
//     token: Type.String()
// });

// const verifyUserServiceBody = Type.Object({
//     channel: Type.String(),
//     token: Type.String(),
//     user_id: Type.String()
// });

// export const verifyUserSchema =  {
//     body: verifyUserBody,
//     respnse: {
//         200: answerObjectSchema()
//     }
// };

// export type VerifyUserDto = Static<typeof verifyUserBody>;
// export type VerifyUserServiceDto = Static<typeof verifyUserServiceBody>;