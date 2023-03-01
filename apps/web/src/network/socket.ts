import * as io from "socket.io-client";

export const openSocket = (token: String) => {
  return io.connect(process.env.SOCKET_DOMAIN! + "/frontend", {
    query: { token: token }
  });
};
