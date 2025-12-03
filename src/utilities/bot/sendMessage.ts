import got from "got";

export async function sendMessage(chatId: string, text: string) {
    await got.post(`${process.env.SOCIAL_NETWORK_API_URL}/bot${process.env.BOT_TOKEN}/sendMessage`, {
        json: {
            chat_id: chatId,
            text: text
        },
        responseType: "json"
    });
}