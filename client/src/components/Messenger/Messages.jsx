import React from "react";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";

const Messages = ({ socketId }) => {
  const messages = useSelector(
    (state) => state.messenger.messageHistory[socketId]
  );
  return (
    <div className="grow flex flex-col overflow-auto gap-2 p-2">
      {messages?.map((message) => (
        <SingleMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
