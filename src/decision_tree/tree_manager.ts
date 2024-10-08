import { ActionType, SupportedActions } from ".";
import { logger } from "../logger";
import { Condition, ConditionData } from "./condition";
import { Loop, LoopData } from "./loop";
import { SendEmail, SendEmailData } from "./send_email";
import { SendSMS, SendSmsData } from "./send_sms";

export class TreeManager {
  constructor() {}

  public async process(actions: SupportedActions[]): Promise<void> {
    if (actions.length === 0) {
      throw new Error("No actions provided.");
    }

    logger.info(`Execution actions`, { meta: actions });
    for (const action of actions) {
      switch (action.type) {
        case ActionType.SendSms:
          await new SendSMS(action.data as SendSmsData).execute();
          break;
        case ActionType.SendEmail:
          await new SendEmail(action.data as SendEmailData).execute();
          break;
        case ActionType.Loop:
          await new Loop(action.data as LoopData).execute();
          break;
        case ActionType.Condition:
          await new Condition(action.data as ConditionData).execute();
          break;
        default:
          throw new Error(
            `Unsupported action type. Supported: ${Object.values(ActionType).join(", ")}`,
          );
      }
    }
    logger.info(`Actions execution finished successfully.`, { meta: actions });
  }
}
