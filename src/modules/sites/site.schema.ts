import { Type, type Static } from "@sinclair/typebox";
import { answerObjectSchema, idObjectParams } from "../../utilities/public.schema.js";

// ===============
// CREATE SITE
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
// UPDATE SITE
// ===============
export const updateSIteSchema = {
    params: idObjectParams,
    body: createSIteBody,
    response: {
        201: answerObjectSchema()
    }
};

// ====================
// SHOW USER SITES
// ====================
const showUserSiteObject = Type.Object({
    title: Type.String(),
    url: Type.String({format: "uri"}),
    downTime: Type.Number({default: 0}),
    isDown: Type.Boolean(),
    error: Type.Optional(Type.Union([Type.String()]))
});

const showUserSitesResponseData = Type.Object({
    username: Type.String(),
    sites: Type.Array(showUserSiteObject)
});

export const showUserSitesSchema = {
    response: {
        200: answerObjectSchema(showUserSitesResponseData)
    }
};

export type ShowUserSiteResponseDto = Static<typeof showUserSiteObject>;