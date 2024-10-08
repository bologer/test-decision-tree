import { ConditionData } from "./condition";
import { LoopData } from "./loop";
import { SendEmailData } from "./send_email";
import { SendSmsData } from "./send_sms";

export enum ActionType {
  SendSms = "send_sms",
  SendEmail = "send_email",
  Loop = "loop",
  Condition = "condition",
}

type TreeItem<T> = {
  type: ActionType;
  data: T;
};

export type SupportedActions =
  | TreeItem<SendSmsData>
  | TreeItem<SendEmailData>
  | TreeItem<ConditionData>
  | TreeItem<LoopData>;
