import got from "got";
import type { IUser } from "../modules/users/user.model.js";

export async function checkSite(url:string) {
    try {
        await got(url, {
            timeout: {request: 5000},
            retry: {
                limit: 2,
                methods: ['GET'],
                statusCodes: [408, 500, 502, 503, 504],
                errorCodes: ['ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENETUNREACH', 'EAI_AGAIN']
            }
        })

        return {isDown: false, error: null};
    } catch (error: any) {
        const statusCode = error.response?.statusCode || null;
        const errorCode = error.code || null;

        return {isDown: true, error: statusCode ? `HTTP Status Code: ${statusCode}` : `Error Code: ${errorCode}`};  
    }
}

export async function checkUserChannel(user:IUser) {
    const channel = user.active_channel;

    if (channel === 'email' && !user.email) return false;
    if (channel === 'email' && !user.is_email_confirmed) return false;

    if (channel === 'sms' && !user.phoneNumber) return false;
    if (channel === 'sms' && !user.is_phone_confirmed) return false;

    if (channel === 'telegram' && !user.telegramChatId) return false;
    if (channel === 'telegram' && !user.is_telegram_confirmed) return false;

    return true;
}