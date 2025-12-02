import { Job } from "@hokify/agenda";
import { siteSirvices } from "../../modules/sites/site.service.js";
import { checkSite } from "../../utilities/checking.js";

export default async function checkSites (job: Job) {
    console.log("Checking sites...");
    const sites = await siteSirvices.findSitesCheckNeeded();
    console.log(`Found ${sites.length} sites to check.`);
    for (const site of sites) {
        const result = await checkSite(site.url)
        console.log(`Site: ${site.url} isDown: ${result.isDown}`);
        await siteSirvices.update(site._id, {
            lastChecked: new Date(),
            isDown: result.isDown,
            error: result.error
        });
    }
}