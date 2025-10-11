/**
 * Function to send mail.
 */

import nodemailer from "nodemailer";
import { PROJECT_EMAIL, PROJECT_NAME } from "../constants/project.constant";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "",
    pass: "",
  },
});
export async function SendMail(to: string, tag: string, subject: string, body: string) {
  const mailOptions = {
    from: `"${PROJECT_NAME}" <${PROJECT_EMAIL}>`,
    to: to,
    subject: subject,
    html: body,
  };

  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log("Failed to send mail:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
