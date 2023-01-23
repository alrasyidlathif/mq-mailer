import amqp from "amqplib"
import { Mailer } from "./mailer.js"

export class Consumer {
    constructor() {
        this.mailer = Mailer.getInstance()
    }

    async consume() {
        try {
            const amqpServer = "amqp://localhost:5672"
            const connection = await amqp.connect(amqpServer)
            this.channel = await connection.createChannel();
            await this.channel.assertQueue("mail");
            
            this.channel.consume("mail", async (data) => {
                const dataStr = data.content.toString()
                console.log(dataStr)
                const result = await this.mailer.send(dataStr)
                if (result) {
                    this.received(data)
                }
            })
        }
        catch (error){
            throw new Error(error)
        }
    }

    received(data) {
        this.channel.ack(data)
    }
}
