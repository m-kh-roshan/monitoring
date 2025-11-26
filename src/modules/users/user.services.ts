import { User, type IUser } from "./user.model.js";

export const userServices = {
    async create(data: IUser) {
        return User.create(data)
    },

    async find(id: string) {
        
    }
}