import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async (app) => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        app.log.info("\u2705 MongoDB connected!!");

    } catch (error) {
        app.log.error(error, "\u274C MongoDB connection error");
        process.exit(1);
    }
});