import nodemailer from "nodemailer";
import { IEmailService } from "../../../application/services/IEmailService";

export class NodeMailerService implements IEmailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_SERVICE_USER,
            pass: process.env.MAIL_SERVICE_PASSWORD,
        }
    })

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.MAIL_SERVICE_USER,
            to,
            subject,
            text: body,
        })
    }
}