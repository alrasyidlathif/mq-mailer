import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

export class Mailer {
    constructor() {
        this.transport = this.init()
    }

    static getInstance() {
        if (!Mailer.instance) {
            Mailer.instance = new Mailer()
        }
        return Mailer.instance
    }

    init() {
        return nodemailer.createTransport({
            pool: true,
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            from: process.env.USER,
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async send(data) {
        try {
            const jsonData = JSON.parse(data)
            await this.transport.sendMail({
                from: process.env.USER,
                to: jsonData.to,
                subject: jsonData.title,
                text: jsonData.body,
            })
            return 1
        } catch (error) {
            console.log(error)
            return 0
        }
    }
}