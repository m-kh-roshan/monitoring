import fp from "fastify-plugin";
import userRoutes from "./user.routes.js";

export default fp(async (app, opts) => {
    app.register(userRoutes, opts)
});