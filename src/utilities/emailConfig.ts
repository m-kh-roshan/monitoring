import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export const sendMail = async (to: string, subject: string, text: string, html: string) => {
    const emailConfig: SMTPTransport.Options = {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    };
    const transporter = nodemailer.createTransport(emailConfig);
    
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
        html,
        headers: {
            "x-liara-tag": "test_email"
        }
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
}

export function confirmEmailBody (token: string, username: string) {
    const confirmUrl = `${process.env.BASE_URL}/api/v1/users/confirm-email?token=${token}`;
    const body = `<h1> Confirm Email </h1>
    <p>Hello dear ${username} <br> 
    We appriciate you for register in my site. Please click on botttom link to confirm your mail.
    <a href="${confirmUrl}"><button>confirm email link</button></a></p>`

    return body
}

export function reportEmailBody (siteUrl: string, error: string) {
    const body = `<h1> Site Down Alert </h1>
    <p>Hello dear user <br> 
    We want to inform you that your monitored site <strong>${siteUrl}</strong> is down now. <br>
    Status Code: <strong>${(error.includes("Error")) ?? error}</strong> <br>
    Error: <strong>${(error.includes("HTTP")) ?? error}</strong> <br>
    Please take the necessary actions to resolve the issue.</p>`;

    return body;
}