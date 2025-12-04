import kavenegar from "kavenegar";


type SendResult = {
    messageid: number,
    message: string,
    status: number,
    statustext: string,
    sender: string,
    receptor: string,
    date: number,
    cost: number
}

export default async function sendSMS (phoneNumber: string, message: string) {
    try {
        const api = kavenegar.KavenegarApi({apikey: process.env.SMS_API_KEY!});
    
        api.Send({message: message , sender: process.env.SMS_SENDER?.toString() , receptor: phoneNumber}, async(res: any) => {
            if (res.status === 5) console.log("SMS sent successfully");
        })
        
    } catch (error) {
        console.error(error)
    }
}