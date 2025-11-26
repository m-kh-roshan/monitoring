import { Type, type Static } from "@sinclair/typebox"



export const answerObjectSchema = Type.Object({
        code: Type.String(),
        message: Type.String()
});

export const idObjectParams = Type.Object({
        id: Type.String()
});

export type idParamsDto = Static<typeof idObjectParams>;