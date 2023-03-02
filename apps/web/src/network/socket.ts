import * as io from "socket.io-client";
import { api } from ".";

export const openSocket = async () => {
  const tokenObj = await api.getSocketAuthToken();
  return io.connect((process.env.SOCKET_DOMAIN! || "ws://localhost:3002") + "/frontend", {
    query: tokenObj,
    transports: ["websocket"]
  });
};