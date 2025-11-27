import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utilities/appError.js";

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.setErrorHandler((err: any, request: FastifyRequest, reply: FastifyReply) => {
        fastify.log.error(err);

        if(err instanceof AppError) {
            return reply.status(err.statusCode).send({
                code: err.code,
                message: err.message
            })
        }

        if(err.validation) {
            return reply.status(400).send({
                code: "VALIDATION_ERROR",
                message: "Invalid request data",
                errors: err.validation
            })
        }

        return reply.status(500).send({
            code: 'INTERNAL_ERROR',
            message: 'Something went wrong. Please try again later.'
        });
    });
}

export default errorHandlerPlugin;