import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { startAgenda } from "./agenda/index.js";

async function startWorker() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        console.log("\u2705 MongoDB connected for Agenda Worker!!");

        await startAgenda();
    } catch (error) {
        console.error("\u274C MongoDB connection error for Agenda Worker", error);
        process.exit(1);
    }
}


startWorker();