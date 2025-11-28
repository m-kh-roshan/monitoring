import { Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, ResponseTokenData } from "../../utilities/public.schema.js";

const tokenBody = Type.Object({
    refreshToken: Type.String()
});

export const tokenSchema = {
    body: tokenBody,
    response: {
        200: answerObjectSchema(ResponseTokenData)
    }
}

export type TokenDto = Static<typeof tokenBody>;