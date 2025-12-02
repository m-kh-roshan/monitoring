import type { FastifyPluginAsync } from "fastify";
import { createUserSchema, loginUserSchema, sendVerifyUserSchema, userInfoSchema } from "./user.schema.js";
import { login, profile, register, sendVerifyUser } from "./user.controller.js";
import { tokenSchema } from "../tokens/token.schema.js";
import { refreshToken } from "../tokens/token.controller.js";

const userRoutes: FastifyPluginAsync = async (app) => {
    app.post("/", {schema: createUserSchema}, register);

    app.post("/login", {schema: loginUserSchema}, login);

    app.get("/", {preHandler: [app.authenticate], schema: userInfoSchema}, profile);

    app.post("/token", {schema: tokenSchema}, refreshToken);

    app.get("/send/:channel", {preHandler: [app.authenticate], schema: sendVerifyUserSchema}, sendVerifyUser);
};

export default userRoutes;