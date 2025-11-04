/**
 * Function to send mail.
 */

import { PROJECT_EMAIL, PROJECT_NAME } from "../constants/project.constant";
import nodemailer from "nodemailer";

export async function SendMailFunction(tag: string, to: string, subject: string, body: string): Promise<boolean> {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: `${PROJECT_NAME} <${PROJECT_EMAIL}>`,
    to: to,
    subject: subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
