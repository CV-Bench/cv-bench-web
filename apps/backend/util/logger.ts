import Logger, { LoggerOptions } from "@ptkdev/logger";

import { loggerTitle } from "shared-types";

import loggerConfig from "./loggerConfig";

const loggerOptions: LoggerOptions = {
  write: true,
  path: {
    debug_log: "./util/logs/debug.log",
    error_log: "./util/logs/errors.log"
  }
};

const baseLogger = new Logger(loggerOptions);
const isProd = process.env.NODE_ENV === "production";

const formatLoggerOutput = (title: loggerTitle, args: string[]): string => {
  let out = `\n${title}:`;
  for (let i = 0; i < args.length; i++) {
    out += "\n\t" + args[i];
  }

  return out;
};

//TODO needs to be moved

const logger = {
  debug: (title: loggerTitle, ...args: string[]) =>
    baseLogger.debug(formatLoggerOutput(title, args)),
  info: (title: loggerTitle, ...args: string[]) =>
    baseLogger.info(formatLoggerOutput(title, args)),
  warning: (title: loggerTitle, ...args: string[]) =>
    baseLogger.warning(formatLoggerOutput(title, args)),
  error: (title: loggerTitle, ...args: string[]) =>
    baseLogger.error(formatLoggerOutput(title, args)),
  sponsor: (title: loggerTitle, ...args: string[]) =>
    baseLogger.sponsor(formatLoggerOutput(title, args)),
  stackoverflow: (title: loggerTitle, ...args: string[]) =>
    baseLogger.stackoverflow(formatLoggerOutput(title, args)),
  docs: (title: loggerTitle, ...args: string[]) =>
    baseLogger.docs(formatLoggerOutput(title, args))
};

if (isProd) {
  logger.debug = () => {};
  logger.sponsor = () => {};
  logger.stackoverflow = () => {};
  logger.docs = () => {};
} else {
  logger.debug = (title: loggerTitle, ...args: string[]) => {
    if (loggerConfig.debugFilter[title])
      baseLogger.debug(formatLoggerOutput(title, args));
  };
}

export default logger;
