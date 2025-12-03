import type { FastifyReply, FastifyRequest } from "fastify";
import crypto from "crypto";
import type { CreateUserDto, LoginUserDto, UpdateUserDto, VerifyEmailUserDto, VerifyUserDto } from "./user.schema.js";
import { userServices, userVerifyServices } from "./user.service.js";
import { AppError } from "../../utilities/appError.js";
import { answer } from "../../utilities/returns.js";
import { compare, hash } from "bcrypt";
import { tokenGenerator } from "../../utilities/tokenGenerator.js";
import { confirmEmailBody, sendMail } from "../../utilities/emailConfig.js";
import { checkConfirmedChannel, checkExistChannel, checkUserChannel } from "../../utilities/checking.js";

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

export const updateProfile = async(req: FastifyRequest, reply: FastifyReply) => {
    const {user_id} = req.user;
    const user = await userServices.find(user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

    const {username, email, phoneNumber, password} = req.body as UpdateUserDto;

    if (username && username !== user.username) {
        const existingUser =  await userServices.findByUsernameOrEmail({username});
        if (existingUser) throw new AppError(`${username} is already exists`, 400, "USERNAME_EXISTS");
    }
    if (email && email !== user.email) {
        const existingUserByEmail =  await userServices.findByUsernameOrEmail({email});
        if (existingUserByEmail) throw new AppError(`${email} is already exists`, 400, "EMAIL_EXISTS");
    }
    if (password) {
        const hashedPassword = await hash(password, 10);
        (req.body as UpdateUserDto).password = hashedPassword;
    }

    await userServices.update(user_id, (req.body as UpdateUserDto));
    return reply.send(answer("USER_UPDATED", "User profile updated successfully"));
}

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

    const confirmed = await checkConfirmedChannel(user, channel);
    if (confirmed) throw new AppError(`User ${channel} is already verified`, 400, "CHANNEL_ALREADY_VERIFIED");

    if (channel !== 'telegram') {
        const checkChannel = await checkExistChannel(user, channel );
        if (!checkChannel) throw new AppError(`User has no ${channel} to verify`, 400, "CHANNEL_NOT_EXISTS");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const existingVerify = await userVerifyServices.findByUserAndChannel(user_id, channel);
    if (!existingVerify) {
        await userServices.produceVerifyChannel({
            channel,
            user_id,
            token
        });
    } else {
        await userVerifyServices.update(existingVerify._id, {token, expiresAt: new Date(Date.now() + 3600*1000)});
    }

    if (channel === 'telegram') {
        const link = `${process.env.SOCIAL_NETWORK_URL}/${process.env.BOT_USERNAME}?start=${token}`;
        return reply.send(answer("VERIFICATION_CREATED", `Verification ${channel} link created  successfully.`, {link}));
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

export const verifyUserEmail = async(req: FastifyRequest, reply: FastifyReply) => {
    const {token} = req.query as VerifyEmailUserDto;

    const userVerify = await userVerifyServices.findByToken(token);
    if (!userVerify) throw new AppError('Verification not found', 404, 'NOT_FOUND');

    if (userVerify.expiresAt < new Date()) throw new AppError('Invalid or expired verification token', 400, 'INVALID_TOKEN');

    const user = await userServices.find(userVerify.user_id);
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
    if (user.is_email_confirmed) throw new AppError('Email is already verified', 400, 'EMAIL_ALREADY_VERIFIED');

    userServices.update(user._id, {is_email_confirmed: true});

    return reply.send(answer("EMAIL_VERIFIED", "User email verified successfully"));
}
