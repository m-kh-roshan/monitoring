import { Pick, Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, idObjectParams } from "../../utilities/public.schema.js";

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
        201: answerObjectSchema
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
        200: answerObjectSchema
    }
};

export type LoginUserDto = Static<typeof loginUserBody>;

// ===============
// UPDATE USER
// ===============
export const updateUserSchema = {
    params: idObjectParams,
    body: createUserSchema.body,
    response: {
        200: answerObjectSchema
    }
};


// ===============
// VERIFY uSER
// ===============
const verifyUserBody = Type.Object({
    channel: Type.String(),
    token: Type.String()
});

const verifyUserServiceBody = Type.Object({
    channel: Type.String(),
    token: Type.String(),
    user_id: Type.String()
});

export const verifyUserSchema =  {
    body: verifyUserBody,
    respnse: {
        200: answerObjectSchema
    }
};

export type VerifyUserDto = Static<typeof verifyUserBody>;
export type VerifyUserServiceDto = Static<typeof verifyUserServiceBody>;