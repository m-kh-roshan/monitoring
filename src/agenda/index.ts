
import { configAgenda } from "./agendaConfig.js";
import { checkSitesScheduler } from "./schedulers/checkSites.scheduler.js";
import { sendReportsScheduler } from "./schedulers/sendReports.scheduler.js";


export const startAgenda = async () => {
    const agenda = configAgenda();
    await checkSitesScheduler(agenda);
    await sendReportsScheduler(agenda);

    await agenda.start();
    console.log("Agenda started and schedulers initialized.");
}