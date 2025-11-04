import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const getAllModulesOfCourse = async (req: Request, res: Response) => {
  // #swagger.tags = ['Modules']
  // #swagger.description = 'Get the list of all modules present in the course.'

  const courseId: number = Number(req.params.id);
  console.log("course id:", courseId);

  if (!courseId || isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      error: "Course id is required",
    });
  }

  try {
    const data = await prisma.$queryRaw<Array<any>>`
    select * from module where course_id = ${courseId}`;

    return res.status(200).json({
      status: true,
      modules: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch modules",
    });
  }
};

export const createModule = async (req: Request, res: Response) => {
  const courseId = Number(req.params.id);

  if (!courseId || isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      error: "Course id is required",
    });
  }

  const name = req.body.name;

  if (!name || name.length < 2) {
    return res.status(400).json({
      success: false,
      error: "Module name is required",
    });
  }

  try {
    const newModule = await prisma.module.create({
      data: {
        name: name,
        course: {
          connect: { id: courseId },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Module created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create new module",
    });
  }
};

export const updateModuleName = async (req: Request, res: Response) => {
  const moduleId = Number(req.params.id);

  if (!moduleId || isNaN(moduleId)) {
    return res.status(400).json({
      success: false,
      error: "Module id is required",
    });
  }

  const newName = req.body.name;

  if (!newName || newName.length < 2) {
    return res.status(400).json({
      success: false,
      error: "Module name is required",
    });
  }

  try {
    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data: { name: newName },
    });

    return res.status(200).json({
      success: true,
      message: "Module name updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update module name",
    });
  }
};

export const deleteModule = async (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.id);

  if (!moduleId || isNaN(moduleId)) {
    return res.status(400).json({
      success: false,
      error: "Module id is required",
    });
  }

  try {
    await prisma.$transaction(async (tx) => {
      // first delete videos that belong to the module
      // TODO: delete videos from aws
      await tx.video.deleteMany({ where: { module_id: moduleId } });

      // then delete the module
      await tx.module.delete({ where: { id: moduleId } });
    });

    return res.status(200).json({
      success: true,
      message: "Module deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete module",
    });
  }
};

export const getModuleDetailsById = async (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.id);

  if (!moduleId || isNaN(moduleId)) {
    return res.status(400).json({
      success: false,
      error: "Module id is required",
    });
  }

  try {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });

    const videos = await prisma.video.findMany({ where: { module_id: moduleId } });

    return res.status(200).json({
      success: true,
      module: module,
      videos: videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch module details",
    });
  }
};
