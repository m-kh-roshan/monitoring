import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
export default fp(async (app) => {
    app.decorate("authentication", async(require))
});