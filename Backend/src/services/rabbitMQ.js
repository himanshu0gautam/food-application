import amqp from 'amqplib';

console.log("-----------RabbitMQ URL:",process.env.RABBITMQ_URL);

const queue = "sellerApprovalQueue";

async function sendApprovalMessage(payload) {
    try {

         if (!payload) {
            throw new Error("Payload is required");
        }

        console.log(payload);

        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        console.log("✓ Connected to RabbitMQ");
        
        await channel.assertQueue(queue, { durable: true });

        const msg = JSON.stringify(payload);
        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log("✓ Message sent to queue:", msg);

        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);
    } catch (error) {
        console.error("✗ RabbitMQ mein error:", error);
        throw error;
    }
}

export { sendApprovalMessage }