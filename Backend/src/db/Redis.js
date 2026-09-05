import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "OoZPupT0W9RHYAiveGLaWz4urdQh4xg9",
  socket: {
    host:'redis-18197.c9.us-east-1-4.ec2.cloud.redislabs.com',
    port: 18197,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  try {
    await client.connect();
    console.log("✅ Redis Connected Successfully");

    const ping = await client.ping();
    console.log("PING Response:", ping); // should print “PONG”

    await client.set("foo", "bar");
    const result = await client.get("foo");

    console.log("Stored value =>", result); // should print “bar”
  } catch (err) {
    console.log("❌ Connection Test Failed:", err);
  }
})();

export default client;
