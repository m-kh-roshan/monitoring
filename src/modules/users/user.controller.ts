import type { FastifyReply, FastifyRequest } from "fastify";
import crypto from "crypto";
import type { CreateUserDto, LoginUserDto, VerifyUserDto } from "./user.schema.js";
import { userServices, userVerifyServices } from "./user.service.js";
import { AppError } from "../../utilities/appError.js";
import { answer } from "../../utilities/returns.js";
import { compare, hash } from "bcrypt";
import { tokenGenerator } from "../../utilities/tokenGenerator.js";
import { confirmEmailBody, sendMail } from "../../utilities/emailConfig.js";

export const register = async(req: FastifyRequest<{Body: CreateUserDto}>, reply: FastifyReply) => {
    const {username, email, password} = req.body;
    const user = await userServices.findByUsernameOrEmail({username});
    if (user) throw new AppError(`${username} is already exists`, 400, "USERNAME_EXISTS");

    if (email) {
        const userByEmail = await userServices.findByUsernameOrEmail({email: email});
        if (userByEmail) throw new AppError(`${email} is already exists`, 400, "EMAIL_EXISTS");
    }

    const hashedPassword = await hash(password, 10);
    req.body.password = hashedPassword;
    await userServices.create(req.body);
    return reply.status(201).send(answer('USER_CREATED', 'User created successfully'));
};

export const login = async(req: FastifyRequest<{Body: LoginUserDto}>, reply: FastifyReply) => {
    const {username, password} = req.body;
    const user = await userServices.findByUsernameOrEmail({username});
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

    const tokens = await tokenGenerator(user, req.server);
    return reply.send(answer("USER_LOGEDIN", "User loged in successfully", tokens));    
};

export const profile = async(req: FastifyRequest, reply: FastifyReply) => {
    const {user_id} = req.user;
    const user = await userServices.find(user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    return reply.send(answer("USER_FETCHED", "user info fetched successfully", user))
};

// User Verify
export const sendVerifyUser = async(req: FastifyRequest, reply: FastifyReply) => {
    const {channel} = req.params as VerifyUserDto;
    const {user_id} = req.user;

    const user = await userServices.find(user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    if(!user.email) throw new AppError('User email not found', 404, 'EMAIL_NOT_FOUND');

    const token = crypto.randomBytes(32).toString("hex");
    const existingVerify = await userVerifyServices.findByUserAndChannel(user_id, channel);
    if (!existingVerify) {
        await userServices.produceVerifyChannel({
            channel,
            user_id,
            token
        });
    } else {
        existingVerify.token = token;
        await existingVerify.save();
    }

    if(channel === 'email') {
        await sendMail(
            user.email!,
            "Email Verification",
            `Please use this token to verify your email: ${token}`,
            confirmEmailBody(token, user.username)
        );
    }

    return reply.send(answer("VERIFICATION_SENT", `Verification token sent to your ${channel} successfully.`));
};
