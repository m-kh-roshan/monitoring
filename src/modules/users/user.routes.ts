import type { FastifyPluginAsync } from "fastify";
import { createUserSchema } from "./user.schema.js";
import { register } from "./user.controller.js";

const userRoutes: FastifyPluginAsync = async (app) => {
    app.post("/", {schema: createUserSchema}, register);
};

export default userRoutes;