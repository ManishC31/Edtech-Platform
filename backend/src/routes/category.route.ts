import { getCategories, createCategories } from "../controllers/category.controller";
import { Router } from "express";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategories);

export default router;
