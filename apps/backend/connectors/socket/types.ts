import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type SocketMiddleware = (
  socket: Socket<DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => void;
