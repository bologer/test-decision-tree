import { logger } from "../logger";
import { Action } from "./action";

export type SendEmailData = {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
};

export class SendEmail implements Action {
  constructor(private data: SendEmailData) {
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

  public async execute(): Promise<void> {
    logger.info(
      `Sending email from ${this.data.sender} to ${this.data.recipient}`,
      { meta: this.data },
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    logger.info(
      `Sent email from ${this.data.sender} to ${this.data.recipient} successfully.`,
      { meta: this.data },
    );
  }
}
