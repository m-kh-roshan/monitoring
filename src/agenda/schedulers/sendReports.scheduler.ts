import type { Agenda } from "@hokify/agenda";
import sendReports from "../jobs/sendReports.job.js";


export const sendReportsScheduler = async (agenda: Agenda) => {
    agenda.define('sendReports', sendReports);
    await agenda.every('30 seconds', 'sendReports');
};