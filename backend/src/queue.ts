/**
 * This is the main file for queues.
 */
import dotenv from "dotenv";
dotenv.config({ debug: true });
import express, { Express, Request, Response } from "express";
import { createQueueDashExpressMiddleware } from "@queuedash/api";

// initialize queues
import "./queues/verification.queue";
import { verificationMailQueue } from "./queues/verification.queue";

const app: Express = express();
const QUEUE_PORT = process.env.QUEUE_PORT || 8001;

app.use(
  "/queue/mail",
  createQueueDashExpressMiddleware({
    ctx: {
      queues: [
        {
          queue: verificationMailQueue,
          displayName: "Verification Mails",
          type: "bullmq" as const,
        },
      ],
    },
  })
);

app.get("/queue-health", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Queue server is working fine!",
  });
});

app.listen(QUEUE_PORT, () => {
  console.log(`Server is running on port ${QUEUE_PORT}`);
});
