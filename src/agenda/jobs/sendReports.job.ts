import { siteSirvices, siteUserServices } from "../../modules/sites/site.service.js";
import { userServices } from "../../modules/users/user.service.js";
import { sendMessage } from "../../utilities/bot/sendMessage.js";
import { checkUserChannel } from "../../utilities/checking.js";
import { reportEmailBody, sendMail } from "../../utilities/emailConfig.js";

export default async function sendReports () {
    console.log("Sending reports...");
    const sites = await siteSirvices.findReportableSites();
    console.log(`Found ${sites.length} reportable sites.`);
    for (const site of sites) {
        const siteUsers = await siteUserServices.siteUsers(site._id);
        for (const siteUser of siteUsers) {
            await siteUserServices.update(siteUser._id, {
                downTime: (siteUser.downTime || 0) + 1
            });
            await siteSirvices.update(site._id, {
                lastNotified: new Date()
            })

            const user = await userServices.find(siteUser.user_id);
            if (user) {
                const channel = user.active_channel;
                const isChannelValid = await checkUserChannel(user);
                if (isChannelValid) {
                    if (channel === "email") {
                        await sendMail(user.email!, "Site Down Alert", "siteDown", reportEmailBody(site.url, site.error!))
                    }

                    if (channel === "telegram") {
                        await sendMessage(user.telegramChatId!, `\u26A0\uFE0F Alert: The site ${site.url} is down.\nError: ${site.error}\nTime: ${new Date().toLocaleString()}`);
                    }
                    
                    if (channel === "sms") {}
                }
            }
        }
    }
}