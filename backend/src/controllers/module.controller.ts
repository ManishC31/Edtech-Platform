import { Request, Response } from "express";

export const getAllModulesOfCourse = async (req: Request, res: Response) => {
  // #swagger.tags = ['Modules']
  // #swagger.description = 'Get the list of all modules present in the course.'

  const courseId = req.params.id;
  console.log("course id:", courseId);

  try {
    // const data = await
  } catch (error) {}
};
