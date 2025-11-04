import { getCategories,createCategories } from "../controllers/course.controller";
import { Router } from "express";

const router = Router();

router.get("/getallCategories",getCategories);
router.post("/createCategories",createCategories);


export default router;