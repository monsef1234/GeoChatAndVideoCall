import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatBoxes: [],
  messageHistory: {},
};
const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setAddChatBoxes: (state, { payload }) => {
      if (!state.chatBoxes.find((box) => box.socketId == payload.socketId)) {
        state.chatBoxes.push(payload);
      }
    },
    setRemoveChatBox: (state, { payload }) => {
      state.chatBoxes = state.chatBoxes.filter(
        (chat) => chat.socketId !== payload
      );
    },
    addChatMessage: (state, { payload }) => {
      if (state.messageHistory[payload.socketId]) {
        state.messageHistory[payload.socketId].push({
          content: payload.content,
          myMessage: payload.myMessage,
          id: payload.id,
        });
      } else {
        state.messageHistory[payload.socketId] = [
          {
            content: payload.content,
            myMessage: payload.myMessage,
            id: payload.id,
          },
        ];
      }
    },
  },
});

export const { setAddChatBoxes, setRemoveChatBox, addChatMessage } =
  messengerSlice.actions;

export default messengerSlice;
