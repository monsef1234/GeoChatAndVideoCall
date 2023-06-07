import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../../redux/messengerSlice";
import { v4 as uuidv4 } from "uuid";
import { sendChatMessage } from "../../socketio/connectWithSocket";

const NewMessage = ({ box }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.map);
  const [inputDisabled, setInputDisabled] = useState(false);
  const messageHandler = (e) => {
    if (e.key == "Enter" && message.trim().length > 0) {
      if (onlineUsers.find((user) => user.socketId == box.socketId)) {
        sendChatMessage({
          id: uuidv4(),
          content: message,
          socketId: box.socketId,
        });
        dispatch(
          addChatMessage({
            id: uuidv4(),
            content: message,
            socketId: box.socketId,
            myMessage: true,
          })
        );
      } else {
        setInputDisabled(true);
      }
      setMessage("");
    }
  };
  return (
    <input
      type="text"
      autoComplete="off"
      placeholder="Type your message..."
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={messageHandler}
      value={message}
      disabled={inputDisabled}
      className="p-2 outline-none border-t-2 disabled:cursor-not-allowed"
    />
  );
};

export default NewMessage;
