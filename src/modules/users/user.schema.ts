import { Pick, Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, idObjectParams, ResponseTokenData } from "../../utilities/public.schema.js";

// ===============
// CREATE USER
// ===============
const createUserBody = Type.Object({
    username: Type.String({minLength: 3}),
    email: Type.Optional(Type.String({format: "email"})),
    password: Type.String({minLength: 8}),
    phoneNumber: Type.Optional(Type.String()),
    active_channel: Type.Optional(Type.String({enum: ['email', 'sms', 'telegram']}))
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
export const updateUserBody = Type.Object({
    username: Type.Optional(Type.String({minLength: 3})),
    email: Type.Optional(Type.String({format: "email"})),
    password: Type.Optional(Type.String({minLength: 8})),
    phoneNumber: Type.Optional(Type.String()),
    active_channel: Type.Optional(Type.String({enum: ['email', 'sms', 'telegram']}))
});

export const updateUserSchema = {
    body: updateUserBody,
    response: {
        200: answerObjectSchema()
    }
};

export type UpdateUserDto = Static<typeof updateUserBody>;


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
    is_telegram_confirmed: Type.Optional(Type.Boolean()),
    active_channel: Type.Optional(Type.String())
});
export const userInfoSchema = {
    response: {
        200: answerObjectSchema(userInfoResponseObject)
    }
};

// ==================================
// SEND VERIFY CHANNEL
// ==================================
const sendVerifyUserParams = Type.Object({
    channel: Type.String({enum: ['email', 'sms', 'telegram']})
});

const sendVerifyUserResponseObject = Type.Object({
    link: Type.Optional(Type.String())
});

export const sendVerifyUserSchema =  {
    params: sendVerifyUserParams,
    response: {
        200: answerObjectSchema(sendVerifyUserResponseObject)
    }
};

export type VerifyUserDto = Static<typeof sendVerifyUserParams>;

// ==================================
// VERIFY USER EMAIL
// ==================================
const verifyEmailUserQuery = Type.Object({
    token: Type.String()
});

export const verifyEmailUserSchema = {
    querystring: verifyEmailUserQuery,
    response: {
        200: answerObjectSchema()
    }
};

export type VerifyEmailUserDto = Static<typeof verifyEmailUserQuery>;