import React from "react";
import { useSelector } from "react-redux";

const RoomJoinBtn = ({
  creatorName,
  roomId,
  amountOfParticipants,
  joinVideoRoom,
}) => {
  const { inRoom } = useSelector((state) => state.video);

  const handleJoinRoom = () => {
    if (inRoom) return alert("Already in room");
    if (amountOfParticipants > 1) return alert("Room is full");
    joinVideoRoom(roomId);
  };
  return (
    <button
      className="bg-blue-500 w-10 h-10 rounded-full font-extrabold uppercase"
      onClick={handleJoinRoom}
    >
      {creatorName.charAt(0)}
    </button>
  );
};

export default RoomJoinBtn;
