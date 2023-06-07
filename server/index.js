const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { PeerServer } = require("peer");
require("dotenv").config();
const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello Server");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const peerServer = new PeerServer({ port: 9000, path: "/peer" });
server.listen(process.env.PORT || 5001, () => {
  console.log("Server Connected");
});
let onlineUsers = {};
let videoRooms = {};
io.on("connection", (socket) => {
  console.log(`user connected of the id : ${socket.id}`);
  socket.on("user-login", (data) => loginHandler(socket, data));
  socket.on("create-video-room", (data) => videoRoomHandler(socket, data));
  socket.on("video-room-join", (data) => videoRoomJoin(socket, data));
  socket.on("video-room-leave", (data) => videoRoomLeave(socket, data));
  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
  socket.on("chat-message", (data) => chatMessageHandler(socket, data));
});
const videoRoomJoin = (socket, data) => {
  const { roomId, peerId } = data;
  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((p) => {
      socket.to(p.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });
    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];
    io.to("logged-users").emit("rooms", videoRooms);
  }
};
const videoRoomHandler = (socket, data) => {
  videoRooms[data.newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id]?.username,
        peerId: data.peerId,
      },
    ],
  };
  io.to("logged-users").emit("rooms", videoRooms);
};
const videoRoomLeave = (socket, data) => {
  if (videoRooms[data]) {
    videoRooms[data].participants = videoRooms[data].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }
  if (videoRooms[data].participants.length > 0) {
    socket
      .to(videoRooms[data].participants[0].socketId)
      .emit("video-call-disconnect");
  }
  if (videoRooms[data].participants.length <= 0) {
    delete videoRooms[data];
  }
  io.to("logged-users").emit("rooms", videoRooms);
};
const disconnectEventHandler = (id) => {
  console.log(`user disconnected of the id : ${id}`);
  logoutHandler(id);
  broadcastdisconncetOnlineUsers(id);
};
const broadcastdisconncetOnlineUsers = (id) => {
  io.to("logged-users").emit("disconnected-user", id);
};
const logoutHandler = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};
const loginHandler = (socket, data) => {
  socket.join("logged-users");
  onlineUsers[socket.id] = {
    username: data.name,
    coords: data.coords,
  };
  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
  io.to("logged-users").emit("rooms", videoRooms);
};

const convertOnlineUsersToArray = () => {
  let usersArray = [];
  Object.entries(onlineUsers).forEach(([key, value]) => {
    usersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });
  return usersArray;
};

const chatMessageHandler = (socket, data) => {
  if (onlineUsers[data.socketId]) {
    io.to(data.socketId).emit("chat-message", {
      senderSocketId: socket.id,
      content: data.content,
      id: data.id,
    });
  }
};
