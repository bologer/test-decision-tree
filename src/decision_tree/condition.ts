import { SupportedActions } from ".";
import { logger } from "../logger";
import { Action } from "./action";
import { TreeManager } from "./tree_manager";

export type ConditionData = {
  condition: string;
  trueAction: SupportedActions;
  falseAction: SupportedActions;
};

export class Condition implements Action {
  constructor(private data: ConditionData) {
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

  public async execute(): Promise<void> {
    logger.info(`Executing condition action`, { meta: this.data });
    const treeManager = new TreeManager();
    const conditionResult = eval(this.data.condition);
    if (typeof conditionResult !== "boolean") {
      throw new Error("Condition must return a boolean");
    }
    logger.info(`Condition result: ${conditionResult}`);
    if (conditionResult) {
      logger.info(`Executing true action`);
      await treeManager.process([this.data.trueAction]);
    } else {
      logger.info(`Executing false action`);
      await treeManager.process([this.data.falseAction]);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    logger.info(`Condition execution finished successfully.`, {
      meta: this.data,
    });
  }
}
