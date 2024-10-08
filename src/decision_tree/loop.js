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
exports.Loop = void 0;
const logger_1 = require("../logger");
const tree_manager_1 = require("./tree_manager");
class Loop {
    constructor(data) {
        this.data = data;
        if (!data.times) {
            throw new Error("Times is required");
        }
        if (typeof data.times !== "number") {
            throw new Error("Times must be a number");
        }
        if (data.times < 1) {
            throw new Error("Times must be equal or greater than 1");
        }
        if (!data.action) {
            throw new Error("Action is required");
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.info(`Executing loop action`, { meta: this.data });
            for (let i = 0; i < this.data.times; i++) {
                logger_1.logger.info(`Executing loop action ${i + 1}/${this.data.times}`);
                yield new tree_manager_1.TreeManager().process([this.data.action]);
                yield new Promise((resolve) => setTimeout(resolve, 1000));
            }
            logger_1.logger.info(`Loop action execution finished successfully.`, {
                meta: this.data,
            });
        });
    }
}
exports.Loop = Loop;
