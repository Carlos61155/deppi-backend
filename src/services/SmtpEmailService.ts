import nodemailer from "nodemailer";
import { EmailService } from "./EmailService";

export class SmtpEmailService implements EmailService {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void>{
        await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text: body
        });
    }

}