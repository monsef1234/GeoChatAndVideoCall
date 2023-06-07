import React from "react";
import CallButton from "./CallButton";
import RoomsList from "./RoomsList";
import RoomJoinBtn from "./RoomJoinBtn";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setInRoom, setLocalStream } from "../../redux/videoSlice";
import {
  createRoomVideo,
  joinVideo,
  leaveRoom,
} from "../../socketio/connectWithSocket";
import { getPeerId } from "../../webRTC/webRtcHanlder";
import VideoOptions from "./VideoOptions";

const Rooms = () => {
  const { rooms, inRoom } = useSelector((state) => state.video);
  const converterToArr = () => {
    if (rooms) {
      let roomsArr = [];
      Object.entries(rooms).forEach(([key, value]) => {
        roomsArr.push({
          id: key,
          creatorUserName: value.participants[0]?.username.charAt(0),
          amountOfParticipants: value.participants.length,
        });
      });
      return roomsArr;
    }
  };
  const dispatch = useDispatch();
  const getAccessToLocalStream = async () => {
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((res) => {
        dispatch(setLocalStream(res));
      })
      .catch((err) => console.log(err));
  };

  const createRoom = async () => {
    if (inRoom) return;
    await getAccessToLocalStream().then(() => {
      const newRoomId = uuidv4();
      createRoomVideo({
        peerId: getPeerId(),
        newRoomId,
      });
      dispatch(setInRoom(newRoomId));
    });
  };
  const joinVideoRoom = async (roomId) => {
    await getAccessToLocalStream().then(() => {
      joinVideo({
        roomId,
        peerId: getPeerId(),
      });
      dispatch(setInRoom(roomId));
    });
  };
  const leaveRoomHandler = () => {
    leaveRoom(inRoom);
    dispatch(setInRoom(null));
  };
  return (
    <div className="absolute right-16 bottom-4 flex flex-col gap-4 text-center">
      <div className="flex flex-col gap-2">
        <RoomsList />
        {inRoom && <VideoOptions leaveRoomHandler={leaveRoomHandler} />}
      </div>
      <div className="flex flex-row-reverse gap-3">
        <CallButton createRoom={createRoom} />
        <div className="flex flex-row-reverse gap-3">
          {converterToArr() &&
            converterToArr().map((room) => (
              <RoomJoinBtn
                key={room.id}
                creatorName={room.creatorUserName}
                roomId={room.id}
                amountOfParticipants={room.amountOfParticipants}
                joinVideoRoom={joinVideoRoom}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
