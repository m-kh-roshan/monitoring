import got from "got";
import { handleMessage } from "./handleMessage.js";
import { sendMessage } from "./sendMessage.js";

let isPolling = false;
let lastUpdateId = 0;
async function botPolling() {
    try {
        const res = await got.post(`${process.env.SOCIAL_NETWORK_API_URL}/bot${process.env.BOT_TOKEN}/getUpdates`, {
            json: { offset: lastUpdateId + 1, timeout: 2},
            responseType: "json"
        });
        
        const updates = (res.body as any).result || [];
        for (const update of updates) {
            lastUpdateId = update.update_id;
            if (update.message && update.message.text) {
                const result = await handleMessage(update);
                await sendMessage(update.message.chat.id, result);
                
            }
        }
    } catch (error) {
        console.error("Polling error:", error);
    }

    botPolling();
}

export function startBotPolling() {
    if (isPolling) {
        console.log("Bot polling is already running.");
        return;
    }

    isPolling = true;
    console.log("Starting bot polling...");
    botPolling();
} 