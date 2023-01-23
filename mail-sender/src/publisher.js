import amqp from 'amqplib'

export async function publish(jsonData) {
    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("mail");
        channel.sendToQueue("mail", Buffer.from(JSON.stringify(jsonData)))
        await channel.close();
        await connection.close();
    }
    catch (error){
      throw new Error(error)
    }
}