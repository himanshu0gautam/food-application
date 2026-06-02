import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "Cwo8RuH9vUEXyv86f84Oi1NNmyIMfQTr",
  socket: {
    host: "sheep-strategic-powder-75383.db.redis.io",
    port: 15671,
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
