import type { FastifyPluginAsync } from "fastify";
import { createSIteSchema, deleteSiteSchema, showUserSitesSchema, updateSIteSchema } from "./site.schema.js";
import { createSite, deleteSite, showUserSites, updateSite } from "./site.controller.js";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const siteRoutes: FastifyPluginAsync = async (app) => {
    app.post("/", { preHandler: app.authenticate, schema: createSIteSchema }, createSite);

    app.put("/:id", { preHandler: app.authenticate, schema: updateSIteSchema }, updateSite);

    app.get("/", { preHandler: app.authenticate, schema: showUserSitesSchema }, showUserSites);

    app.delete("/", { preHandler: app.authenticate, schema: deleteSiteSchema }, deleteSite);
}

export default siteRoutes;