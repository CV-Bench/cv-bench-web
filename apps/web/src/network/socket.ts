// const io = require("socket.io-client");
import { api } from ".";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import useSWR, { SWRResponse } from "swr";

import { addToast } from "@/components/Toast";

import { NotificationDb } from "shared-types";

export const useSocket = async () => {
  const [globSocket, setSocket] = useState<Socket>();
  const { data: tokenObj } = useSWR("/auth/token", api.getSocketAuthToken);

  useEffect(() => {
    if (!tokenObj) {
      return;
    }

    globSocket?.disconnect();

    const socket = io(
      (process.env.SOCKET_DOMAIN! || "http://localhost:3002") + "/frontend",
      {
        query: tokenObj,
        transports: ["websocket"]
      }
    );

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {});

    socket.on(
      "notification",
      ({ title, description, type, href }: NotificationDb) => {
        addToast(title, description, type, href);
      }
    );

    setSocket(socket);
  }, []);
};
