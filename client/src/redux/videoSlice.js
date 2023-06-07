import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  inRoom: null,
  rooms: null,
  localStream: null,
  remoteStream: null,
  micOn: true,
  cameraOn: true,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setInRoom: (state, { payload }) => {
      state.inRoom = payload;
    },
    setAddRoom: (state, { payload }) => {
      state.rooms = payload;
    },
    setLocalStream: (state, { payload }) => {
      state.localStream = payload;
    },
    setRemoteStream: (state, { payload }) => {
      state.remoteStream = payload;
    },
    setMicOn: (state, { payload }) => {
      state.micOn = payload;
    },
    setCameraOn: (state, { payload }) => {
      state.cameraOn = payload;
    },
  },
});

export const {
  setInRoom,
  setAddRoom,
  setLocalStream,
  setRemoteStream,
  setMicOn,
  setCameraOn,
} = videoSlice.actions;

export default videoSlice;
