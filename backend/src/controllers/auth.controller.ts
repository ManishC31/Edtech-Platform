import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import bcrypt from "bcryptjs";
import { verificationMailQueue } from "../queues/verification.queue";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password, role, date_of_birth, org_name, org_description, org_email, org_phone, staff_role } = req.body;

  if (role === "STAFF") {
    if (!org_name || !org_description || !org_email || !staff_role) {
      return res.status(400).json({
        success: false,
        error: "Data for new organization is incomplete",
      });
    }
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    // transaction for DB operations
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          name,
          email,
          password: encPassword,
          role,
          date_of_birth,
        },
      });

      if (role === "STAFF") {
        const organization = await tx.organizations.create({
          data: {
            name: org_name,
            description: org_description,
            contact_email: org_email,
            contact_phone: org_phone,
          },
        });

        await tx.staff_members.create({
          data: {
            user_id: user.id,
            organization_id: organization.id,
            staff_role,
            joined_at: new Date(),
          },
        });
      }

      return { user };
    });

    await verificationMailQueue.add("standard-mail", { user_id: result.user.id });

    res.status(201).json({
      success: true,
      message: "Account created successfully, verify email to activate account",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {};

export const signOut = async (req: Request, res: Response) => {};
