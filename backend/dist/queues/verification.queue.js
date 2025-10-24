"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationMailQueue = void 0;
const bullmq_1 = require("bullmq");
const bullmq_2 = require("bullmq");
const redis_config_1 = __importDefault(require("../config/redis.config"));
const newAccountMail_1 = __importDefault(require("../constants/mails/newAccountMail"));
const crypto_1 = __importDefault(require("crypto"));
const project_constant_1 = require("../constants/project.constant");
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const mail_util_1 = require("../utils/mail.util");
// define a queue
exports.verificationMailQueue = new bullmq_1.Queue("verification-mail");
// create a worker
const verificationMailWorker = new bullmq_2.Worker("verification-mail", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = job.data.user_id;
    console.log("user id to send mail:", userId);
    if (!userId) {
        throw new Error("user id is required");
    }
    try {
        const userData = yield prisma_config_1.default.users.findUnique({ where: { id: userId }, select: { email: true } });
        const verificationToken = crypto_1.default.randomBytes(16).toString("hex");
        const verificationExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        yield prisma_config_1.default.users.update({
            where: { id: userId },
            data: {
                verification_token: verificationToken,
                verification_expiry: verificationExpiry,
            },
        });
        const originalMailBody = newAccountMail_1.default;
        const uniqueUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const alteredMailBody = originalMailBody.replace("{{VERIFY_URL}}", uniqueUrl);
        const response = yield (0, mail_util_1.SendMailFunction)("NEW_ACCOUNT", userData.email, `${project_constant_1.PROJECT_NAME} - Account Activation`, alteredMailBody);
        if (response) {
            console.log("[verification-mail]: Email send successfully");
        }
        else {
            throw new Error("Failed to send the mail");
        }
    }
    catch (err) {
        throw err;
    }
}), { connection: redis_config_1.default });
verificationMailWorker.on("completed", (job) => {
    console.log(`[Verification-Mail]:${job.id} has completed!`);
});
verificationMailWorker.on("failed", (job, err) => {
    console.log(`[Verification-Mail]:${job.id} has failed with ${err.message}`);
});
//# sourceMappingURL=verification.queue.js.map