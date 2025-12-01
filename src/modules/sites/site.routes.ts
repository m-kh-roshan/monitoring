import type { FastifyPluginAsync } from "fastify";
import { createSIteSchema, updateSIteSchema } from "./site.schema.js";
import { createSite, updateSite } from "./site.controller.js";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const siteRoutes: FastifyPluginAsync = async (app) => {
    const typedApp = app.withTypeProvider<TypeBoxTypeProvider>();
    typedApp.post("/", { preHandler: typedApp.authenticate, schema: createSIteSchema }, createSite);
    typedApp.put("/:id", { preHandler: typedApp.authenticate, schema: updateSIteSchema }, updateSite);
}

export default siteRoutes;