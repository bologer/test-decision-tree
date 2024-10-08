import { formatISO, getMilliseconds } from "date-fns";
import { TransformableInfo } from "logform";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.printf((info: TransformableInfo): string => {
    let logMessage = "[{date}] [{level}] {message}{meta}";
    const date = new Date();
    const logDate = formatISO(date) + "." + getMilliseconds(date);
    logMessage = logMessage.replace("{date}", logDate);
    logMessage = logMessage.replace("{level}", info.level);
    logMessage = logMessage.replace("{message}", info.message);
    logMessage = logMessage.replace(
      "{meta}",
      info.meta ? ` ${JSON.stringify(info.meta)}` : "",
    );
    return logMessage;
  }),
  transports: [
    new winston.transports.File({
      filename: "../logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "../logs/combined.log" }),
    new winston.transports.Console(),
  ],
});
