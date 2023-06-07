import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyLocation } from "../redux/mapSlice";
import { connectWithSocket, login } from "../socketio/connectWithSocket";
import fakePlaces from "../fakePlaces";
import { connectWithPeerServer } from "../webRTC/webRtcHanlder";

const Login = () => {
  const [name, setName] = useState("");
  const [locationError, setLocationError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myLocation } = useSelector((state) => state.map);
  const isValidName = () => {
    return name.length > 0 && name.length < 10 && !name.includes(" ");
  };
  const loginHandler = () => {
    login({ name, coords: myLocation });
    navigate("/map");
  };
  const onSuccess = ({ coords: { latitude, longitude } }) => {
    dispatch(
      setMyLocation(fakePlaces[Math.floor(Math.random() * fakePlaces.length)])
    );
  };
  const onError = () => {
    console.log("Error occurred when trying to get location");
    setLocationError(true);
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  useEffect(() => {
    if (myLocation) {
      connectWithSocket();
      connectWithPeerServer();
    } else {
      getLocation();
    }
  }, [myLocation]);
  return (
    <div className="bg-gray-300  min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-3 flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold text-blue-500">
          GeoCall
        </h1>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          className="outline-none w-full border-2 focus:border-blue-500 rounded p-2 text-black"
        />
        <button
          type="button"
          className="block disabled:opacity-50 disabled:cursor-not-allowed mt-3 rounded py-2 duration-[0.5s] bg-blue-500 text-white"
          onClick={loginHandler}
          disabled={!isValidName() || locationError}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
