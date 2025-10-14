import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import bcrypt from "bcryptjs";
import { verificationMailQueue } from "../queues/verification.queue";
import jwt from "jsonwebtoken";
import { UAParser } from "ua-parser-js";
import requestIp from "request-ip";

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
      message: "Account created successfully, verify email within 30 minutes to activate account",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: "No user found with email",
      });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: "Email & password are not matching",
      });
    }

    if (!existingUser?.is_mail_verified) {
      return res.status(400).json({
        success: false,
        error: "Account is not verified yet. Check your mail to verify email.",
      });
    }

    /**
     * Logic:
     * create a token and set in cookie
     * add user session with details of the user
     */

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    console.log("token:", token);

    // get user device details
    const deviceDetails = UAParser(req.headers["user-agent"]);
    console.log("device details:", deviceDetails.browser);

    const ipAddress = requestIp.getClientIp(req);

    await prisma.user_sessions.create({
      data: {
        user: {
          connect: { id: existingUser.id },
        },
        operating_system: deviceDetails?.os?.name,
        browser_name: deviceDetails?.browser?.name,
        browser_version: deviceDetails?.browser.version,
        ip_address: ipAddress,
        updated_at: new Date(),
      },
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: token,
    });
  } catch (error) {
    console.log("Err in signin:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to login user",
    });
  }
};

export const sendVerificationMail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userDetails = await prisma.users.findUnique({
      where: { email: email },
      select: {
        id: true,
        is_contact_verified: true,
      },
    });

    if (userDetails?.is_contact_verified) {
      return res.status(400).json({
        success: false,
        error: "Account is already verified. Login in your account.",
      });
    }

    await verificationMailQueue.add("standard-mail", { user_id: userDetails.id });

    return res.status(200).json({
      success: true,
      message: "Verification email is sent. Verify the account within 30 minutes",
    });
  } catch (error) {
    console.log("Err in verifyEmail:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send verification mail. Retry after some time.",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (typeof token !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid or missing token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET as string);

    if (!decoded || typeof decoded === "string" || !(decoded as jwt.JwtPayload).id) {
      return res.status(400).json({
        success: false,
        error: "Invalid token",
      });
    }

    const { id } = decoded as jwt.JwtPayload;

    const userData = await prisma.users.findFirst({
      where: { id: id },
      select: {
        verification_token: true,
        verification_expiry: true,
      },
    });

    if (!userData) {
      return res.status(400).json({
        success: false,
        error: "Invalid token",
      });
    }

    // check if token expired or not
    if (userData.verification_expiry.getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        error: "Token is expired",
      });
    }

    await prisma.users.update({
      where: { id: id },
      data: {
        is_mail_verified: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User signed out successfully",
  });
};
