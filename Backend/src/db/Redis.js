import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'DuoE2Si3u0JA7qGM0iBH4ibUGWT5w8J1',
    socket: {
        host: 'redis-11139.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11139
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

