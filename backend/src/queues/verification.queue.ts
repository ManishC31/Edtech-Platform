import { Queue } from "bullmq";
import { Worker } from "bullmq";
import redisConnection from "../config/redis.config";

// define a queue
export const verificationMailQueue = new Queue("verification-mail");

// create a worker
const verificationMailWorker = new Worker(
  "verification-mail",
  async (job) => {
    console.log("Job to process", job.data);
  },
  { connection: redisConnection }
);

verificationMailWorker.on("completed", (job) => {
  console.log(`[Verification-Mail]:${job.id} has completed!`);
});

verificationMailWorker.on("failed", (job, err) => {
  console.log(`[Verification-Mail]:${job.id} has failed with ${err.message}`);
});
