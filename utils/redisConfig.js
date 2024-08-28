require("dotenv").config();

const Redis = require("ioredis");

const pubClient = new Redis(process.env.REDIS_URL);

const subClient = pubClient.duplicate();

// const client = createClient({
//   port: 6379,
//   host: "http://localhost:3000",
// });

pubClient.on("connect", () => {
  console.log("Connection!");
});

pubClient.on("disconnect", () => {
  console.log("Redis disconnected!");
});

pubClient.on("error", (error) => {
  console.log(error.message);
});

pubClient.on("end", () => {
  console.log("client disconnected from redis!");
});

//No need for the ioredis pacakge
// client
//   .connect()
//   .then(() => {
//     console.log("Redis connected");
//   })
//   .catch(console.error);

module.exports = { pubClient, subClient };
