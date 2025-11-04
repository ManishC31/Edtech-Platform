import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]?.trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated user",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !(decoded as jwt.JwtPayload).id) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated user",
      });
    }

    const userDetails = await prisma.$queryRaw<Array<any>>`
    select u.id, u.name, u.email, u.role as user_role, sm.orgnization_id, sm.staff_role from users u 
    join staff_members sm on u.id = sm.user_id 
    where u.id = ${decoded?.id}`;

    if (userDetails.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated user",
      });
    }

    console.log("user details:", userDetails[0]);
    req.user = userDetails[0];
    next();
  } catch (error) {
    console.log("Err in checkLogin:", error);
    return res.status(401).json({
      success: false,
      error: "Unauthenticated user",
    });
  }
};

export const allowedRoles = (...acceptedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Normalize roles: support both customRole('admin', 'student') and customRole(['admin', 'student'])
    let roles = Array.isArray(acceptedRoles[0]) ? acceptedRoles[0] : acceptedRoles;
    roles = [...roles.map((word: string) => word.toLowerCase())];
    console.log("all roles:", roles);

    const userRole = req.user && req.user.role.toLowerCase();
    console.log("user role:", userRole);

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "You are not allowed for this resource" });
    }
    next();
  };
};
