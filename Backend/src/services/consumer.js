import amqp from "amqplib/callback_api.js";
import { sendApprovalEmail } from "../utils/emailer..js";

const queue = "sellerApprovalQueueConsumer";


async function startConsumer() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.prefetch(1);

    console.log("waiting for messsage ...");

    channel.consume(queue, async (msg) => {
        if(!msg) return;
        try {

            const payload = JSON.parse(msg.content.toString());
            console.log("Received message:", payload);

            await sendApprovalEmail(payload.email);

            channel.ack(msg);
            
        } catch (error) {
            console.error("failed to process message", error)
            channel.ack(msg);
        }
        }, { noAck: false });
}

startConsumer().catch(err => console.error("consumer error:", err));

