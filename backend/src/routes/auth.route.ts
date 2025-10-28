import { Router } from "express";
import { sendVerificationMail, signIn, signOut, signUp, verifyEmail } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginUserSchema, mailVerificationSchema, registerUserSchema, sendVerificationMailSchema } from "../validators/auth.validator";

const router = Router();

router.post("/signup", validate({ body: registerUserSchema }), signUp);
router.post("/signin", validate({ body: loginUserSchema }), signIn);
router.post("/send-email", validate({ body: sendVerificationMailSchema }), sendVerificationMail);
router.get("/verify-email", validate({ query: mailVerificationSchema }), verifyEmail);
router.get("/signout", signOut);

export default router;
