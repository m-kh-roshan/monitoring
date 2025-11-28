import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utilities/appError.js";


export default fp(async (app) => {
    app.register(jwt, {secret: process.env.JWT_SECRET!});

    app.decorate("authenticate", async(req: FastifyRequest, reply: FastifyReply) => {
        try {
            await req.jwtVerify();
        } catch (error) {
            throw new AppError("Token expired or invalid", 401, "Unauthorized")
        }
    })
});