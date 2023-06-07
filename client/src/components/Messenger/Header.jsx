import React from "react";
import { useDispatch } from "react-redux";
import { setRemoveChatBox } from "../../redux/messengerSlice";

const Header = ({ box }) => {
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    dispatch(setRemoveChatBox(id));
  };
  return (
    <div className="bg-blue-500 text-white text-center py-2 flex items-center">
      <span className="grow"> {box.username}</span>
      <svg
        onClick={() => removeHandler(box.socketId)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default Header;
