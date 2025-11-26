import type { idParamsDto } from "../../utilities/public.schema.js";
import { User } from "./user.model.js";
import type { CreateUserDto } from "./user.schema.js";

export const userServices = {
    async create(data: CreateUserDto) {
        return User.create(data)
    },

    async find(id: idParamsDto) {
        return User.findById(id)
    },

    async update(id: idParamsDto, data: CreateUserDto) {
        return User.findByIdAndUpdate(id, data)
    }
}