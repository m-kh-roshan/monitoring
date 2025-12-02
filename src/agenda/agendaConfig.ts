import {Agenda} from "@hokify/agenda";

export const configAgenda = () => {
    return new Agenda({
        db: { 
            address: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            collection: process.env.DB_AGENDA_COLLECTION! 
        },
        processEvery: "15 seconds",
        maxConcurrency: 10,
        defaultConcurrency: 5
    });
}