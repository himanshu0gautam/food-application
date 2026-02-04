import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '4jY3pCZZ6Mc49Jffr5XyUCSi7A3afUCw',
    socket: {
        host: 'redis-10861.c323.us-east-1-2.ec2.cloud.redislabs.com',
        port: 10861
    }
});

client.on('error', err => console.log('Redis Client Error', err));


(async () => {
    try {
        await client.connect();
        console.log("✅ Redis Connected Successfully");

        const ping = await client.ping();
        console.log("PING Response:", ping);  // should print “PONG”

        await client.set('foo', 'bar');
        const result = await client.get('foo');

        console.log("Stored value =>", result);  // should print “bar”
    } catch (err) {
        console.log("❌ Connection Test Failed:", err);
    }
})();

export default client;

