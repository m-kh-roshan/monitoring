// import crypto from 'crypto';
import type { idParamsDto } from "../../utilities/public.schema.js";
import { User, UserVerify } from "./user.model.js";
import type { CreateUserDto, VerifyUserServiceDto } from "./user.schema.js";

type UsernameOrEmail = {
    username?: string, 
    email?: string
}

export const userServices = {
    async create(data: CreateUserDto) {
        return User.create(data)
    },

    async find(id: idParamsDto) {
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

    async produceVerifyChannel(data: VerifyUserServiceDto) {
        return UserVerify.create(data);
    }
}