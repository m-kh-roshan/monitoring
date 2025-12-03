import type { FastifyPluginAsync } from "fastify";
import { createUserSchema, loginUserSchema, sendVerifyUserSchema, updateUserSchema, userInfoSchema, verifyEmailUserSchema } from "./user.schema.js";
import { login, profile, register, sendVerifyUser, updateProfile, verifyUserEmail } from "./user.controller.js";
import { tokenSchema } from "../tokens/token.schema.js";
import { refreshToken } from "../tokens/token.controller.js";

const userRoutes: FastifyPluginAsync = async (app) => {
    app.post("/", {schema: createUserSchema}, register);

    app.post("/login", {schema: loginUserSchema}, login);

    app.patch("/", {preHandler: [app.authenticate], schema: updateUserSchema}, updateProfile);

    app.get("/", {preHandler: [app.authenticate], schema: userInfoSchema}, profile);

    app.post("/token", {schema: tokenSchema}, refreshToken);

    app.get("/send/:channel", {preHandler: [app.authenticate], schema: sendVerifyUserSchema}, sendVerifyUser);

    app.get("/confirm-email", {schema: verifyEmailUserSchema}, verifyUserEmail);
};

export default userRoutes;