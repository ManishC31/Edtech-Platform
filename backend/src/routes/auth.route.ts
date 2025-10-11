import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "../validators/users.validator";

const router = Router();

router.post("/signup", validate(registerUserSchema), signUp);
router.post("/signin", validate(loginUserSchema), signIn);
router.get("/signout", signOut);

export default router;
