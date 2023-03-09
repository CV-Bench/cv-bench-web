import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import {
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents
} from "shared-types";

export type SocketMiddleware = (
  socket: Socket<DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => void;

export type FrontendSocket = Socket<
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents
>;

export type SocketWithUser = FrontendSocket & {
  user: { _id: string; [key: string]: any };
};
