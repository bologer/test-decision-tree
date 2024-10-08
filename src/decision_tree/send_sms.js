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
exports.SendSMS = void 0;
const logger_1 = require("../logger");
class SendSMS {
    constructor(data) {
        this.data = data;
        if (!data.phone) {
            throw new Error("Phone number is required.");
        }
        if (!data.text) {
            throw new Error("Text is required.");
        }
        // other validation
        // e.g. phone format
        // e.g. max text length as SMS has restrictions
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info(`Sending SMS to ${this.data.phone} with text: ${this.data.text}`, { meta: this.data });
            yield new Promise((resolve) => setTimeout(resolve, 5000));
            logger_1.logger.info(`Sent SMS to ${this.data.phone} successfully.`, {
                meta: this.data,
            });
        });
    }
}
exports.SendSMS = SendSMS;
