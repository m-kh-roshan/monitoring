import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserDto } from "./user.schema.js";
import { userServices } from "./user.service.js";
import { AppError } from "../../utilities/appError.js";
import { answer } from "../../utilities/returns.js";

export const register = async(req: FastifyRequest<{Body: CreateUserDto}>, reply: FastifyReply) => {
    const {username, email} = req.body;
    const user = await userServices.findByUsernameOrEmail({username});
    if (user) throw new AppError(`${username} is already exists`, 400, "USERNAME_EXISTS");

    if (email) {
        const userByEmail = await userServices.findByUsernameOrEmail({email: email});
        if (userByEmail) throw new AppError(`${email} is already exists`, 400, "EMAIL_EXISTS");
    }

    await userServices.create(req.body)
    return reply.status(201).send(answer('USER_CREATED', 'User created successfully'))
};

// export const sendVerify
