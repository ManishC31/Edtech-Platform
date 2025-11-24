import { getCategories, createCategories, deleteCategories } from "../controllers/category.controller";
import { Router } from "express";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategories);
router.delete("/:id", deleteCategories);

export default router;
