import { loggerTitle } from "shared-types";

const loggerConfig: {
  debugFilter: {
    [title in loggerTitle]: boolean;
  };
} = {
  //Set which parts of the logging output should be displayed (only effects development environment)
  debugFilter: {
    "EXPRESS SERVER": true,
    "EXPRESS REQUEST": true,
    "MONGO CLIENT": true,
    "REDIS CLIENT": true,
    "AUTH CLIENT": true,
    "SOCKET": true
  }
};

export default loggerConfig;
