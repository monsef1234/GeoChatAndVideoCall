import React from "react";
import { useSelector } from "react-redux";
import Video from "./Video";

const RoomsList = () => {
  const { localStream, inRoom, remoteStream } = useSelector(
    (state) => state.video
  );
  return (
    <>
      {localStream && inRoom && (
        <div className="w-60 h-48 bg-black mx-auto overflow-hidden rounded-md">
          <Video localStream={localStream} />
        </div>
      )}
      {remoteStream && inRoom && (
        <div className="w-60 h-48 bg-black mx-auto overflow-hidden rounded-md">
          <Video localStream={remoteStream} />
        </div>
      )}
    </>
  );
};

export default RoomsList;
