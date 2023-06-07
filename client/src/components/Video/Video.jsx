import React, { useEffect, useRef } from "react";

const Video = ({ localStream }) => {
  const videoEl = useRef();
  useEffect(() => {
    const video = videoEl.current;
    video.srcObject = localStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [localStream]);
  return (
    <div className="w-full h-full">
      <video
        ref={videoEl}
        className="w-full h-full"
        playsInline
        autoPlay
      ></video>
    </div>
  );
};

export default Video;
