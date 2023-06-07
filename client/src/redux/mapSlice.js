import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLocation: (state, { payload }) => {
      state.myLocation = payload;
    },
    setOnlineUsers: (state, { payload }) => {
      state.onlineUsers = payload;
    },
    setDisconnectUser: (state, { payload }) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user.socketId !== payload
      );
    },
    setCardOption: (state, { payload }) => {
      state.cardChosenOption = payload;
    },
  },
});
export const {
  setMyLocation,
  setOnlineUsers,
  setDisconnectUser,
  setCardOption,
} = mapSlice.actions;
export default mapSlice;
