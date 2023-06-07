import React from "react";
import Chatbox from "./Chatbox";
import { useSelector } from "react-redux";

const Messenger = () => {
  const { chatBoxes } = useSelector((state) => state.messenger);

  return (
    <div className="absolute bottom-0 left-2 flex gap-3">
      {chatBoxes.length > 0 &&
        chatBoxes.map((box) => {
          return <Chatbox key={box.socketId} box={box} />;
        })}
    </div>
  );
};

export default Messenger;
