"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the main file for queues.
 */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("@queuedash/api");
// initialize queues
require("./queues/verification.queue");
const verification_queue_1 = require("./queues/verification.queue");
const app = (0, express_1.default)();
const QUEUE_PORT = process.env.QUEUE_PORT || 8001;
app.use("/queue/mail", (0, api_1.createQueueDashExpressMiddleware)({
    ctx: {
        queues: [
            {
                queue: verification_queue_1.verificationMailQueue,
                displayName: "Verification Mails",
                type: "bullmq",
            },
        ],
    },
}));
app.get("/queue-health", (req, res) => {
    return res.status(200).json({
        message: "Queue server is working fine!",
    });
});
app.listen(QUEUE_PORT, () => {
    console.log(`Server is running on port ${QUEUE_PORT}`);
});
//# sourceMappingURL=queue.js.map