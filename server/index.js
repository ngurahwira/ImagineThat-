const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = 3000;
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  const words = [
    "apple",
    "banana",
    "orange",
    "pineapple",
    "pinus",
    "crocodile",
    "sugar",
    "coffee",
    "tree",
    "door",
  ]; // Kata-kata yang mungkin
  let currentWord = "";
  currentWord = words[Math.floor(Math.random() * words.length)];

  socket.on("chat message", (data) => {
    console.log("Message:", data.message, "from:", data.name);
    io.emit("chat message", data);
  });

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("clearCanvas", () => {
    io.emit("clearCanvas");
  });
});

server.listen(port, () => {
  console.log("Listening on", port);
});
