import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mapSlice from "./mapSlice";
import messengerSlice from "./messengerSlice";
import videoSlice from "./videoSlice";

const rootReducers = combineReducers({
  map: mapSlice.reducer,
  messenger: messengerSlice.reducer,
  video: videoSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredPaths: "video/localStream",
  //       ignoreActions: "video/setLocalStream",
  //     },
  //   }),
});

export default store;
