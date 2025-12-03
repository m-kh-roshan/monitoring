import { userServices, userVerifyServices } from "../../modules/users/user.service.js";

export async function handleMessage(update: any): Promise<string> {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    if(text.startsWith('/start')) {
        const token = text.split(' ')[1];
        const userTelegramVerified = await userVerifyServices.findByToken(token);
        if (!userTelegramVerified)  return "Invalid or expired token.";
        if (userTelegramVerified.channel !== 'telegram') return "Invalid token for Telegram verification.";
        if (userTelegramVerified.expiresAt <= new Date()) return "Token has expired.";
        
        const user = await userServices.find(userTelegramVerified.user_id);
        if (!user) return "User not found for the provided token.";
        if (user.is_telegram_confirmed) return "Telegram is already verified for this user.";
        
        await userServices.update(user._id, { 
            is_telegram_confirmed: true,
            telegramChatId: String(chatId)
        });

        if (user.active_channel === 'telegram') return "Telegram verified successfully. Now you will receive notifications here.";

        return "Telegram verified successfully. You can set Telegram as your active channel to receive notifications here.";
    }

    return "Handled";
}