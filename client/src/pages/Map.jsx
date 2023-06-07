import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import Markers from "../components/Markers";
import { useNavigate } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import Messenger from "../components/Messenger/Messenger";
import Rooms from "../components/Video/Rooms";

const Map = () => {
  const { myLocation, onlineUsers, cardChosenOption } = useSelector(
    (state) => state.map
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!myLocation) navigate("/");
  }, []);
  return (
    <div className="h-screen relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        zoom={7}
        center={{ lat: myLocation?.latitude, lng: myLocation?.longitude }}
      >
        {onlineUsers &&
          onlineUsers.length > 0 &&
          onlineUsers.map((user) => {
            return (
              <Markers
                user={user}
                key={user.socketId}
                lat={user.coords.latitude}
                lng={user.coords.longitude}
                text={user?.myself ? "Me" : user.username}
              />
            );
          })}
      </GoogleMapReact>
      <Messenger />
      <Rooms />
      {cardChosenOption && <CardInfo />}
    </div>
  );
};

export default Map;
