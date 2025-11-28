import 'fastify';
import type { FastifyRequest, FastifyReply } from 'fastify';
import '@fastify/jwt';
import type { Types } from 'mongoose';

declare module 'fastify'{
    interface FastifyInstance {
        authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT{
        payload: {
            user_id: Types.ObjectId,
            username?: string
        };
        user: {
            user_id: Type.ObjectId,
            username: string
        }
    }
}