import fastify, { type FastifyInstance } from "fastify";
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

type AppWithMongo = {
    app: FastifyInstance,
    mongo: MongoMemoryServer
};

export const buildApp = async (): Promise<AppWithMongo> => {
    const mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    
    const app = fastify();
    app.ready();

    return {app, mongo};
};