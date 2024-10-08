import { SupportedActions } from ".";
import { logger } from "../logger";
import { Action } from "./action";
import { TreeManager } from "./tree_manager";

export type LoopData = {
  times: number;
  action: SupportedActions;
};

export class Loop implements Action {
  constructor(private data: LoopData) {
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

  public async execute(): Promise<void> {
    logger.info(`Executing loop action`, { meta: this.data });
    for (let i = 0; i < this.data.times; i++) {
      logger.info(`Executing loop action ${i + 1}/${this.data.times}`);
      await new TreeManager().process([this.data.action]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    logger.info(`Loop action execution finished successfully.`, {
      meta: this.data,
    });
  }
}
