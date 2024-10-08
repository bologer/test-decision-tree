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
exports.Condition = void 0;
const logger_1 = require("../logger");
const tree_manager_1 = require("./tree_manager");
class Condition {
    constructor(data) {
        this.data = data;
        if (!("condition" in data)) {
            throw new Error("Condition is required");
        }
        if (typeof data.condition !== "string") {
            throw new Error("Condition must be a string");
        }
        if (!data.trueAction) {
            throw new Error("True action is required");
        }
        if (!data.falseAction) {
            throw new Error("False action is required");
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info(`Executing condition action`, { meta: this.data });
            const treeManager = new tree_manager_1.TreeManager();
            const conditionResult = eval(this.data.condition);
            if (typeof conditionResult !== "boolean") {
                throw new Error("Condition must return a boolean");
            }
            logger_1.logger.info(`Condition result: ${conditionResult}`);
            if (conditionResult) {
                logger_1.logger.info(`Executing true action`);
                yield treeManager.process([this.data.trueAction]);
            }
            else {
                logger_1.logger.info(`Executing false action`);
                yield treeManager.process([this.data.falseAction]);
            }
            yield new Promise((resolve) => setTimeout(resolve, 5000));
            logger_1.logger.info(`Condition execution finished successfully.`, {
                meta: this.data,
            });
        });
    }
}
exports.Condition = Condition;
