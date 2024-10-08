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
exports.TreeManager = void 0;
const _1 = require(".");
const logger_1 = require("../logger");
const condition_1 = require("./condition");
const loop_1 = require("./loop");
const send_email_1 = require("./send_email");
const send_sms_1 = require("./send_sms");
class TreeManager {
    constructor() { }
    process(actions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (actions.length === 0) {
                throw new Error("No actions provided.");
            }
            logger_1.logger.info(`Execution actions`, { meta: actions });
            for (const action of actions) {
                switch (action.type) {
                    case _1.ActionType.SendSms:
                        yield new send_sms_1.SendSMS(action.data).execute();
                        break;
                    case _1.ActionType.SendEmail:
                        yield new send_email_1.SendEmail(action.data).execute();
                        break;
                    case _1.ActionType.Loop:
                        yield new loop_1.Loop(action.data).execute();
                        break;
                    case _1.ActionType.Condition:
                        yield new condition_1.Condition(action.data).execute();
                        break;
                    default:
                        throw new Error(`Unsupported action type. Supported: ${Object.values(_1.ActionType).join(", ")}`);
                }
            }
            logger_1.logger.info(`Actions execution finished successfully.`, { meta: actions });
        });
    }
}
exports.TreeManager = TreeManager;
