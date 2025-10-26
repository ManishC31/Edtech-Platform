import { getCategories } from "../controllers/course.controller";
import { Router } from "express";

const router = Router();


router.get("/getallCategories",getCategories);

export default router;