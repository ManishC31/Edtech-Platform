"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const users_validator_1 = require("../validators/users.validator");
const router = (0, express_1.Router)();
router.post("/signup", (0, validate_middleware_1.validate)(users_validator_1.registerUserSchema), auth_controller_1.signUp);
router.post("/signin", (0, validate_middleware_1.validate)(users_validator_1.loginUserSchema), auth_controller_1.signIn);
router.get("/signout", auth_controller_1.signOut);
exports.default = router;
//# sourceMappingURL=auth.route.js.map