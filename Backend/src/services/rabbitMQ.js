import amqp from 'amqplib/callback_api.js';
// import dotenv from 'dotenv';

// dotenv.config();

console.log("-----------RabbitMQ URL:",process.env.RABBITMQ_URL);

const queue = "sellerApprovalQueue";

async function sendApprovalMessage(payload) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    console.log("connected to RabbitMQ");
    
    // const message = "New seller registration approval needed";
    await channel.assertQueue(queue, { durable: true});

    const msg = JSON.stringify(payload)
    channel.sendToQueue(queue, Buffer.from(msg), {persistent: true });
    console.log("message sent to queue:", msg);

    setTimeout(() => {
        channel.close();
        connection.close();
    }, 1000);
    
}
// console.log("-------------",sendApprovalMessage);


export { sendApprovalMessage }