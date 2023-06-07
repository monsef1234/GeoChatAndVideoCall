import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCameraOn, setMicOn } from "../../redux/videoSlice";

const VideoOptions = ({ leaveRoomHandler }) => {
  const { micOn, cameraOn, localStream } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const micOnHandler = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setMicOn(!micOn));
  };
  const cameraOnHandler = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setCameraOn(!cameraOn));
  };
  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        onClick={micOnHandler}
        className="bg-blue-500 w-10 h-10 rounded-full cursor-pointer text-white flex items-center justify-center"
      >
        {micOn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              d="M16.4259 17.839L21.1935 22.6066L22.6077 21.1924L2.80874 1.3934L1.39453 2.80761L7.00113 8.41421V10C7.00113 12.7614 9.23971 15 12.0011 15C12.4835 15 12.9499 14.9317 13.3912 14.8042L14.9413 16.3544C14.0474 16.7688 13.0513 17 12.0011 17C8.47466 17 5.55725 14.3923 5.07202 11H3.05606C3.51721 15.1716 6.82952 18.4839 11.0011 18.9451V23H13.0011V18.9451C14.2351 18.8087 15.3939 18.4228 16.4259 17.839ZM11.5538 12.9669C10.2551 12.7727 9.22843 11.7461 9.03426 10.4473L11.5538 12.9669ZM19.3757 15.1604L17.9333 13.7179C18.4417 12.9084 18.789 11.9874 18.9302 11H20.9462C20.7763 12.5366 20.2197 13.9565 19.3757 15.1604ZM16.4668 12.2514L14.9183 10.703C14.9725 10.4775 15.0011 10.2421 15.0011 10V6C15.0011 4.34315 13.658 3 12.0011 3C10.7069 3 9.60408 3.81956 9.18335 4.96802L7.68672 3.47139C8.55524 1.99268 10.1623 1 12.0011 1C14.7626 1 17.0011 3.23858 17.0011 6V10C17.0011 10.8099 16.8086 11.5748 16.4668 12.2514Z"
              fill="rgba(255,255,255,1)"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>
      <button
        onClick={leaveRoomHandler}
        className="bg-blue-500 w-10 h-10 rounded-full cursor-pointer text-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
          />
        </svg>
      </button>
      <button
        onClick={cameraOnHandler}
        className="bg-blue-500 w-10 h-10 rounded-full cursor-pointer text-white flex items-center justify-center"
      >
        {cameraOn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default VideoOptions;
