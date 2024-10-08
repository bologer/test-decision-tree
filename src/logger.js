"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const date_fns_1 = require("date-fns");
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.printf((info) => {
        let logMessage = "[{date}] [{level}] {message}{meta}";
        const date = new Date();
        const logDate = (0, date_fns_1.formatISO)(date) + "." + (0, date_fns_1.getMilliseconds)(date);
        logMessage = logMessage.replace("{date}", logDate);
        logMessage = logMessage.replace("{level}", info.level);
        logMessage = logMessage.replace("{message}", info.message);
        logMessage = logMessage.replace("{meta}", info.meta ? ` ${JSON.stringify(info.meta)}` : "");
        return logMessage;
    }),
    transports: [
        new winston_1.default.transports.File({
            filename: "../logs/error.log",
            level: "error",
        }),
        new winston_1.default.transports.File({ filename: "../logs/combined.log" }),
        new winston_1.default.transports.Console(),
    ],
});
