import { Job } from "@hokify/agenda";
import { siteSirvices, siteUserServices } from "../../modules/sites/site.service.js";
import { checkSite } from "../../utilities/checking.js";

export default async function checkSites (job: Job) {
    console.log("Checking sites...");
   try {
     const sites = await siteSirvices.findSitesCheckNeeded();
    console.log(`Found ${sites.length} sites to check.`);
    for (const site of sites) {
        const siteUsers = await siteUserServices.siteUsers(site._id);
        if (siteUsers.length === 0) {
            await siteSirvices.update(site._id, {
                lastChecked: new Date(),
            });
            continue;
        }
        const result = await checkSite(site.url)
        console.log(`Site: ${site.url} isDown: ${result.isDown}`);
        await siteSirvices.update(site._id, {
            lastChecked: new Date(),
            isDown: result.isDown,
            error: result.error
        });
    }
   } catch (error) {
    console.error("Error in checking sites job:", error);
   }
}