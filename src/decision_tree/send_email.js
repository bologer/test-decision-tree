"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const logger_1 = require("../logger");
class SendEmail {
    constructor(data) {
        this.data = data;
        if (!data.sender) {
            throw new Error("Sender is required.");
        }
        if (!data.recipient) {
            throw new Error("Recipient is required.");
        }
        if (!data.subject) {
            throw new Error("Subject is required.");
        }
        if (!data.body) {
            throw new Error("Body is required.");
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info(`Sending email from ${this.data.sender} to ${this.data.recipient}`, { meta: this.data });
            yield new Promise((resolve) => setTimeout(resolve, 5000));
            logger_1.logger.info(`Sent email from ${this.data.sender} to ${this.data.recipient} successfully.`, { meta: this.data });
        });
    }
}
exports.SendEmail = SendEmail;
