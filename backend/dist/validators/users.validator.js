"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(100),
    date_of_birth: zod_1.z.date().optional(),
    role: zod_1.z.enum(["STUDENT", "STAFF", "ADMIN"]),
    org_name: zod_1.z.string().optional(),
    org_description: zod_1.z.string().optional(),
    org_email: zod_1.z.string().email().optional(),
    staff_role: zod_1.z.string().optional(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(100),
});
//# sourceMappingURL=users.validator.js.map