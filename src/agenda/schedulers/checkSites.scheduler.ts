import type { Agenda } from "@hokify/agenda";
import checkSites from "../jobs/checkSites.job.js";


export const checkSitesScheduler = async (agenda: Agenda) => {
    agenda.define('checkSites', checkSites);
    await agenda.every('20 seconds', 'checkSites');
}