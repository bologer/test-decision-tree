import { logger } from "../logger";
import { Action } from "./action";

export type SendSmsData = {
  phone: string;
  text: string;
};

export class SendSMS implements Action {
  constructor(private data: SendSmsData) {
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

  public async execute(): Promise<void> {
    logger.info(
      `Sending SMS to ${this.data.phone} with text: ${this.data.text}`,
      { meta: this.data },
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    logger.info(`Sent SMS to ${this.data.phone} successfully.`, {
      meta: this.data,
    });
  }
}
