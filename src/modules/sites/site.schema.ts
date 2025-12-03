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
    tags: ['Sites'],
    summary: 'Create a new site to monitor',
    security: [{ bearerAuth: [] }],
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
    tags: ['Sites'],
    summary: 'Update site info',
    security: [{ bearerAuth: [] }],
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
    tags: ['Sites'],
    summary: 'Show all sites for a user',
    security: [{ bearerAuth: [] }],
    response: {
        200: answerObjectSchema(showUserSitesResponseData)
    }
};

export type ShowUserSiteResponseDto = Static<typeof showUserSiteObject>;

// ===============
// DELETE SITE
// ===============
export const deleteSiteSchema = {
    tags: ['Sites'],
    summary: 'Delete a site',
    security: [{ bearerAuth: [] }],
    params: idObjectParams,
    response: {
        200: answerObjectSchema()
    }
};