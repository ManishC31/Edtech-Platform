import express from "express";
import { createModule, deleteModule, getAllModulesOfCourse, getModuleDetailsById, updateModuleName } from "../controllers/module.controller";
const router = express.Router();

router.get("/:id", getAllModulesOfCourse);

router.get("/details/:id", getModuleDetailsById);

router.post("/:id", createModule);

router.put("/:id", updateModuleName);

router.delete("/:id", deleteModule);

export default router;
