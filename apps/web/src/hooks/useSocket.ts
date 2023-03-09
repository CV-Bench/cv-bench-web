/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import useSWR, { SWRResponse } from "swr";

import { addToast } from "@/components/Toast";

import {
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents,
  NotificationDb
} from "shared-types";

import { api } from "../network";

export const useSocket = () => {
  const [globSocket, setSocket] =
    useState<
      Socket<
        FrontendNamespaceServerToClientEvents,
        FrontendNamespaceClientToServerEvents
      >
    >();
  const { data: tokenObj } = useSWR("/auth/token", api.getSocketAuthToken);

  useEffect(() => {
    if (!tokenObj) {
      return;
    }

    globSocket?.disconnect();

    const socket: Socket<
      FrontendNamespaceServerToClientEvents,
      FrontendNamespaceClientToServerEvents
    > = io(
      (process.env.NEXT_PUBLIC_SOCKET_DOMAIN! || "http://localhost:3002") +
        "/frontend",
      {
        query: tokenObj,
        transports: ["websocket"]
      }
    );

    console.log(socket);

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {});

    socket.on(
      "notification",
      ({ title, description, type, href }: NotificationDb) => {
        addToast(title, description, type, href);

        // TODO Invalidate Notifications
      }
    );

    setSocket(socket);
  }, [tokenObj]);

  return globSocket;
};
