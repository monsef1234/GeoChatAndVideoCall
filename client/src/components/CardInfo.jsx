import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddChatBoxes } from "../redux/messengerSlice";

const CardInfo = () => {
  const { cardChosenOption, myLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return Math.round(d) + "km";
    else if (d <= 1) return Math.round(d * 1000) + "m";
    return d;
  }
  const chatHandler = () => {
    dispatch(
      setAddChatBoxes({
        socketId: cardChosenOption.socketId,
        username: cardChosenOption.username,
      })
    );
  };
  return (
    <div className="flex items-center justify-between absolute top-8 rounded shadow-md shadow-blue-500 p-2 left-5 bg-white max-w-sm w-full">
      <div>
        <h1 className="font-extrabold">{cardChosenOption.username}</h1>
        <p className="mt-3">
          {distance(
            myLocation.latitude,
            myLocation.longitude,
            cardChosenOption.coords.latitude,
            cardChosenOption.coords.longitude
          )}
        </p>
      </div>
      <svg
        onClick={chatHandler}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-blue-500 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    </div>
  );
};

export default CardInfo;
