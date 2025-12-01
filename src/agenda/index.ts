import {Agenda} from "@hokify/agenda";

const agenda = new Agenda({
    db: { 
        address: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_AGENDA_NAME}`,
        collection: process.env.DB_AGENDA_COLLECTION! 
    },
    processEvery: "1 minute",
    maxConcurrency: 10,
    defaultConcurrency: 5
});

export default agenda;