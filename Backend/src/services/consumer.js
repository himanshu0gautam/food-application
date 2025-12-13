import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import amqp from "amqplib";
console.log("consumer loaded");
import { sendApprovalEmail } from "../utils/emailer.js";
console.log("emailer imported");


const queue = "sellerApprovalQueue";

export async function startConsumer() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });

        channel.prefetch(1);

        console.log("✓ Consumer waiting for messages on queue:", queue);

        channel.consume(queue, async (msg) => {
            if (!msg) return;
            try {
                const payload = JSON.parse(msg.content.toString());
                console.log("Received message:", payload);

                await sendApprovalEmail(payload.email);

                channel.ack(msg);
                console.log("✓ Message processed and acknowledged");
            } catch (error) {
                console.error("✗ Failed to process message:", error);
                channel.nack(msg, false, true);
            }
        }, { noAck: false });
    } catch (error) {
        console.error("✗ Consumer error:", error);
        setTimeout(startConsumer, 5000);
    }
}

startConsumer();

