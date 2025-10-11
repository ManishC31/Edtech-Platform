/**
 * Function to send mail.
 */

import { PROJECT_EMAIL, PROJECT_NAME } from "../constants/project.constant";

// import nodemailer from "nodemailer";
// export async function SendMailFunction(tag: string, to: string, subject: string, body: string) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.USER,
//       pass: "",
//     },
//   });

//   const mailOptions = {
//     from: `"${PROJECT_NAME}" <${PROJECT_EMAIL}>`,
//     to: to,
//     subject: subject,
//     html: body,
//   };

//   await transporter.sendMail(mailOptions, function (error: any, info: any) {
//     if (error) {
//       throw error;
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }

import { Resend } from "resend";

export async function SendMailFunction(tag: string, to: string, subject: string, body: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `"${PROJECT_NAME}" <${PROJECT_EMAIL}>`,
      to,
      subject,
      html: body,
    });

    console.log(`[${tag}] Email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error(`[${tag}] Failed to send email to ${to}:`, error);
    return { success: false, error };
  }
}
