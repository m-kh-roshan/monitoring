// import crypto from 'crypto';
import type { Types } from "mongoose";
import type { idParamsDto } from "../../utilities/public.schema.js";
import { User, UserVerify, type IUserVerification } from "./user.model.js";
import type { CreateUserDto } from "./user.schema.js";

type UsernameOrEmail = {
    username?: string, 
    email?: string
}

export const userServices = {
    async create(data: CreateUserDto) {
        return User.create(data)
    },

    async find(id: Types.ObjectId) {
        return User.findById(id)
    },

    async update(id: idParamsDto, data: CreateUserDto) {
        return User.findByIdAndUpdate(id, data)
    },

    async findByUsernameOrEmail(data: UsernameOrEmail) {
        const {username, email} = data;
        const query = username ? {username} : (email ? {email} : null)
        if (query) return User.findOne(query)
    },

    async produceVerifyChannel(data: Partial<IUserVerification>) {
        return UserVerify.create(data);
    }
};

export const userVerifyServices = {
    async findByUserAndChannel(user_id: Types.ObjectId, channel: string) {
        return UserVerify.findOne({user_id, channel});
    }
}