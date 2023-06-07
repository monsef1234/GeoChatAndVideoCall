import React, { useEffect, useRef } from "react";

const SingleMessage = ({ message }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <div
        className={`rounded max-w-[300px]  px-2 py-3 text-white break-words ${
          message.myMessage ? "self-end bg-blue-500" : "self-start bg-gray-500"
        }`}
      >
        {message.content}
      </div>
      <div ref={ref}></div>
    </>
  );
};

export default SingleMessage;
