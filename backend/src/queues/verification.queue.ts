import { Queue } from "bullmq";
import { Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import newAccountMail from "../constants/mails/newAccountMail";
import crypto from "crypto";
import { PROJECT_NAME } from "../constants/project.constant";
import prisma from "../config/prisma.config";
import { SendMailFunction } from "../utils/mail.util";

// define a queue
export const verificationMailQueue = new Queue("verification-mail");

// create a worker
const verificationMailWorker = new Worker(
  "verification-mail",
  async (job) => {
    const userId = job.data.user_id;
    console.log("user id to send mail:", userId);

    if (!userId) {
      throw new Error("user id is required");
    }

    try {
      const userData = await prisma.users.findUnique({ where: { id: userId }, select: { email: true } });

      const verificationToken = crypto.randomBytes(16).toString("hex");
      const verificationExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

      await prisma.users.update({
        where: { id: userId },
        data: {
          verification_token: verificationToken,
          verification_expiry: verificationExpiry,
        },
      });

      const originalMailBody = newAccountMail;
      const uniqueUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
      const alteredMailBody = originalMailBody.replace("{{VERIFY_URL}}", uniqueUrl);

      const response = await SendMailFunction("NEW_ACCOUNT", userData.email, `${PROJECT_NAME} - Account Activation`, alteredMailBody);

      if (response) {
        console.log("[verification-mail]: Email send successfully");
      } else {
        throw new Error("Failed to send the mail");
      }
    } catch (err) {
      throw err;
    }
  },
  { connection: redisConnection }
);

verificationMailWorker.on("completed", (job) => {
  console.log(`[Verification-Mail]:${job.id} has completed!`);
});

verificationMailWorker.on("failed", (job, err) => {
  console.log(`[Verification-Mail]:${job.id} has failed with ${err.message}`);
});
