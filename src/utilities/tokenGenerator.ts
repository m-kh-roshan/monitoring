import type { FastifyInstance } from "fastify";
import crypto from "crypto";
import type { Document } from "mongoose";

import type { IUser } from "../modules/users/user.model.js";
import { refreshTokenServices } from "../modules/tokens/token.service.js";


export function hashToken(token: string){
    return crypto.createHash("sha256").update(token).digest("hex");
}

export async function tokenGenerator(user: IUser & Document, app: FastifyInstance) {
    const payload = {
        user_id: user._id,
        username: user.username
    }
    const access_token = app.jwt.sign(payload, {
        expiresIn: "100m",
    });
    const refresh_token = app.jwt.sign(
        {user_id: user._id},
        {
            expiresIn: "7d"
        }
    );

    const hashedToken = hashToken(refresh_token);
    const refreshTokenRow = {
        user_id : user._id,
        token: hashedToken
    };
    await refreshTokenServices.create(refreshTokenRow);

    const tokens = {
        accessToken: access_token,
        refreshToken: refresh_token
    };
    return tokens;
}

