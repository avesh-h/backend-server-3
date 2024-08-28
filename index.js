const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { pubClient, subClient } = require("./utils/redisConfig");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();
app.use(express.json());

app.use(cors());

app.post("/", (req, res) => {});

const server = app.listen("3003", () => {
  console.log("3003 server is up!");
});

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
  adapter: createAdapter(pubClient, subClient),
});

//Socket events
io.on("connection", (socket) => {
  console.log("socketttttttttt", socket?.handshake?.query);

  const { channelName } = socket?.handshake?.query;

  //Channel
  socket.join(channelName);

  console.log("socket", socket.rooms);

  socket.on("sendMessage", (msg) => {
    console.log("msgggg", msg);

    io.to(channelName).emit("recentMessage", msg);
  });
});
