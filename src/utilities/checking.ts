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

export async function checkExistChannel(user:IUser, channel: string) {
    if ((channel === 'email' && !user.email) ||
        (channel === 'sms' && !user.phoneNumber) ||
        (channel === 'telegram' && !user.telegramChatId)
    ) return false;

    return true;
}

export async function checkConfirmedChannel(user:IUser, channel: string) {
    if ((channel === 'email' && !user.is_email_confirmed) ||
        (channel === 'sms' && !user.is_phone_confirmed) ||
        (channel === 'telegram' && !user.is_telegram_confirmed)
    ) return false;

    return true;
}

export async function checkUserChannel(user:IUser) {
    const channel = user.active_channel;
    if (!channel) return false;

    const exists = await checkExistChannel(user, channel);
    if (!exists) return false;

    const confirmed = await checkConfirmedChannel(user, channel);
    if (!confirmed) return false;

    return true;
}