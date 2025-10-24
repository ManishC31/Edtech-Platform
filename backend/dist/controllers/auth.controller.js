"use strict";
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
exports.signOut = exports.signIn = exports.signUp = void 0;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verification_queue_1 = require("../queues/verification.queue");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield prisma_config_1.default.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Email is already registered",
            });
        }
        const encPassword = yield bcryptjs_1.default.hash(password, 10);
        // transaction for DB operations
        const result = yield prisma_config_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield tx.users.create({
                data: {
                    name,
                    email,
                    password: encPassword,
                    role,
                    date_of_birth,
                },
            });
            if (role === "STAFF") {
                const organization = yield tx.organizations.create({
                    data: {
                        name: org_name,
                        description: org_description,
                        contact_email: org_email,
                        contact_phone: org_phone,
                    },
                });
                yield tx.staff_members.create({
                    data: {
                        user_id: user.id,
                        organization_id: organization.id,
                        staff_role,
                        joined_at: new Date(),
                    },
                });
            }
            return { user };
        }));
        yield verification_queue_1.verificationMailQueue.add("standard-mail", { user_id: result.user.id });
        res.status(201).json({
            success: true,
            message: "Account created successfully, verify email to activate account",
        });
    }
    catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.signIn = signIn;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.signOut = signOut;
//# sourceMappingURL=auth.controller.js.map