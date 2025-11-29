import { Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, idObjectParams } from "../../utilities/public.schema.js";

// ===============
// creteSites
// ===============
const createSIteBody = Type.Object({
    url: Type.String({format: "uri"}),
    title: Type.Optional(Type.String())
});

export const createSIteSchema = {
    body: createSIteBody,
    response: {
        201: answerObjectSchema()
    }
};

export type CreateSiteDto = Static<typeof createSIteBody>;

// ===============
// updateSite
// ===============
export const updateSIteSchema = {
    params: idObjectParams,
    body: createSIteBody,
    response: {
        201: answerObjectSchema()
    }
};