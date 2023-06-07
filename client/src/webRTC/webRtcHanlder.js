import Peer from "peerjs";
import store from "../redux/store";
import { setRemoteStream } from "../redux/videoSlice";

let peerId;
let peer;
export const getPeerId = () => {
  return peerId;
};
export const connectWithPeerServer = () => {
  peer = new Peer(undefined, {
    host: "localhost",
    path: "/peer",
    port: 9000,
  });
  peer.on("open", (id) => {
    peerId = id;
  });
  peer.on("call", async (call) => {
    const localStream = store.getState().video.localStream;
    call.answer(localStream);
    call.on("stream", (remoteStream) => {
      console.log("remoteStream" + remoteStream);
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

export const call = (data) => {
  const { newParticipantPeerId } = data;
  const localStream = store.getState().video.localStream;

  const peerCall = peer.call(newParticipantPeerId, localStream);

  peerCall.on("stream", (remoteStream) => {
    console.log("stream came");
    store.dispatch(setRemoteStream(remoteStream));
  });
};
export const disconnect = () => {
  for (let conns in peer.connections) {
    peer.connections[conns].forEach((c) => {
      c.peerConnection.close();
      if (c.close) c.close();
    });
  }
  store.dispatch(setRemoteStream(null));
};
