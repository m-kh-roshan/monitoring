import type { FastifyReply, FastifyRequest } from "fastify";
import type { TokenDto } from "./token.schema.js";
import { refreshTokenServices } from "./token.service.js";
import { hashToken, tokenGenerator } from "../../utilities/tokenGenerator.js";
import { AppError } from "../../utilities/appError.js";
import { userServices } from "../users/user.service.js";
import { answer } from "../../utilities/returns.js";

export const refreshToken = async(req: FastifyRequest<{Body: TokenDto}>, reply: FastifyReply) => {
    const {refreshToken} = req.body;

    const hashedToken = hashToken(refreshToken);
    const token = await refreshTokenServices.findByToken(hashedToken);
    if (!token) throw new AppError("No token", 404, "NOT_FOUND");

    refreshTokenServices.delete(token._id);

    const user = await userServices.find(token.user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    const tokens = await tokenGenerator(user, req.server);
    
    return reply.send(answer("TOKEN_REFRESHED", "Token refreshed successfully", tokens));
};