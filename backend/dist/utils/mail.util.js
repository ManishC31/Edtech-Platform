"use strict";
/**
 * Function to send mail.
 */
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
exports.SendMailFunction = SendMailFunction;
const project_constant_1 = require("../constants/project.constant");
const nodemailer_1 = __importDefault(require("nodemailer"));
function SendMailFunction(tag, to, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        let mailOptions = {
            from: `${project_constant_1.PROJECT_NAME} <${project_constant_1.PROJECT_EMAIL}>`,
            to: to,
            subject: subject,
            html: body,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
            return true;
        }
        catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    });
}
//# sourceMappingURL=mail.util.js.map