import React from "react";
import Header from "./Header";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

const Chatbox = ({ box }) => {
  return (
    <div className="h-96 bg-white rounded-t-md w-80 overflow-hidden flex flex-col">
      <Header box={box} />
      <Messages socketId={box.socketId} />
      <NewMessage box={box} />
    </div>
  );
};

export default Chatbox;
