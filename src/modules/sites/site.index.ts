import fp from "fastify-plugin";
import siteRoutes from "./site.routes.js";

export default fp(async (app, opts) => {
    app.register(siteRoutes, opts)
});