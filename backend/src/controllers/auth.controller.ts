import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import bcrypt from "bcryptjs";
import { PROJECT_NAME } from "../utils/constants";
import { SendMail } from "../utils/mail.util";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password, role, date_of_birth, org_name, org_description, org_email, staff_role } = req.body;

  // validate organization details here if the role is staff
  if (role === "STAFF") {
    if (!org_name || !org_description || !org_email || !staff_role) {
      return res.status(400).json({
        success: false,
        error: "Data for new organization is incomplete",
      });
    }
  }
  try {
    const existingUser = prisma.users.findUnique({ where: { email: email } });
    console.log("existinguser:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: encPassword,
        role: role,
        date_of_birth: date_of_birth,
      },
    });

    console.log("new user:", user);

    if (role === "STAFF") {
      const organization = await prisma.organizations.create({
        data: { name: org_name, description: org_description, contact_email: org_email, contact_phone: req.body.org_phone },
      });

      console.log("new organization:", organization);

      const stafMember = await prisma.staff_members.create({
        data: {
          user_id: user.id,
          organization_id: organization.id,
          staff_role: staff_role,
          joined_at: new Date(),
        },
      });

      console.log("new staff member:", stafMember);
    }

    return res.status(201).json({
      success: true,
      message: "Account created successfully, verify email to activate account",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  } finally {
    // send a mail to user for verification
    const mailBody = `<p>Hi ${name},</p>`;
    await SendMail(email, "NEW_ACCCOUNT", `${PROJECT_NAME} - Activate account`, mailBody);
  }
};

export const signIn = async (req: Request, res: Response) => {};

export const signOut = async (req: Request, res: Response) => {};
