import type { Types } from "mongoose";
import { RefreshToken, type IRefreshToken } from "./token.model.js";

export const refreshTokenServices = {
    async create(data: IRefreshToken) {
        return RefreshToken.create(data);
    },

    async findByToken(token: string) {
        return RefreshToken.findOne({token})
    },

    async delete(id: Types.ObjectId) {
        return RefreshToken.findByIdAndDelete(id);
    } 
};