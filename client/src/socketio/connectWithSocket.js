import { io } from "socket.io-client";
import store from "../redux/store";
import { setDisconnectUser, setOnlineUsers } from "../redux/mapSlice";
import { addChatMessage, setAddChatBoxes } from "../redux/messengerSlice";
import { setAddRoom } from "../redux/videoSlice";
import { call, disconnect } from "../webRTC/webRtcHanlder";
let socket;

export const connectWithSocket = () => {
  socket = io("http://localhost:5001");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });
  socket.on("rooms", (data) => {
    console.log("rooms : " + data);
    store.dispatch(setAddRoom(data));
  });
  socket.on("online-users", (data) => {
    let newData = data.map((user) => {
      if (user.socketId === socket.id) {
        user.myself = true;
      }
      return user;
    });
    store.dispatch(setOnlineUsers(newData));
  });
  socket.on("disconnected-user", (id) => {
    store.dispatch(setDisconnectUser(id));
  });
  socket.on("video-call-disconnect", () => {
    disconnect();
  });
  socket.on("chat-message", (data) => {
    store.dispatch(
      addChatMessage({
        id: data.id,
        content: data.content,
        socketId: data.senderSocketId,
        myMessage: false,
      })
    );
    openChatBox(data.senderSocketId);
  });
  socket.on("video-room-init", (data) => {
    console.log(data);
    call(data);
  });
};
const openChatBox = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatBoxes.find((chat) => chat.socketId === socketId);
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;
  if (!chatbox) {
    store.dispatch(
      setAddChatBoxes({
        socketId,
        username,
      })
    );
  }
};

export const login = (data) => {
  socket.emit("user-login", data);
};
export const sendChatMessage = (data) => {
  socket.emit("chat-message", data);
};
export const createRoomVideo = (data) => {
  socket.emit("create-video-room", data);
};
export const joinVideo = (data) => {
  console.log(data);
  socket.emit("video-room-join", data);
};
export const leaveRoom = (inRoom) => {
  socket.emit("video-room-leave", inRoom);
};
