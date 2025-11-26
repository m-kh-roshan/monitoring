import { Type } from "@sinclair/typebox"

const answerSchema = {
        code: Type.String(),
        message: Type.String()
}

export const answerObjectSchema = Type.Object(answerSchema)