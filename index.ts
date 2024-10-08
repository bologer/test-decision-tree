import express, { Express, Request, Response } from "express";
import { SupportedActions } from "./src/decision_tree";
import { TreeManager } from "./src/decision_tree/tree_manager";
import { logger } from "./src/logger";

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

class ErrorEnvelope {
  constructor(public error: string) {}
}

app.post(
  "/actions",
  async (
    req: Request<
      any,
      any,
      {
        actions: SupportedActions[];
      }
    >,
    res: Response,
  ) => {
    if (!req.body || !("actions" in req.body)) {
      res.status(400).send(new ErrorEnvelope("No actions provided."));
      return;
    }

    const actions = req.body.actions;
    if (!actions || (Array.isArray(actions) && actions.length === 0)) {
      res.status(400).send(new ErrorEnvelope("No actions provided."));
      return;
    }

    try {
      const treeManager = new TreeManager();
      await treeManager.process(actions);
      res.send({}).status(200);
    } catch (error) {
      logger.error("Error processing actions", error);
      res
        .status(500)
        .send(new ErrorEnvelope(`Error processing actions: '${error}'`));
    }
  },
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
