import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await prisma.$queryRaw<Array<any>>`
        SELECT
        c.id AS "categoryId",        
        c.name AS "categoryName",    
    FROM 
    category c`;

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories: allCategories,
    });
  } catch (error) {
    console.log("get all categories error", error);
    res.status(500).json({ success: false,
      error: "failed to fetch categories and their courses" });
  }
};


export const createCategories = async (req: Request, res: Response) => {
  const  {name}  = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      success: false,
      error: "category name should be non-empty and should be a string",
    });
  }
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error: "Failed to create category or link courses." });
  }
};

export const deleteCategories =async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if(!id){
    return res.status(400).json({
      success:false,
      error: "catrgory id is needed"
    })
  }

  try {
    const deleteId =await prisma.category.findUnique({
      where:{
        id:id
      },
      select:{
        id:true
      }
    })
    if(deleteId){
      const deletedData = await prisma.$executeRawUnsafe(
        `DELETE from category
        WHERE id =$1
        AND NOT EXISTS(
          SELECT 1
          FROM course
          WHERE course.category_id = category.id
        );`,id
      )
        if (deletedData===1){
          return res.status(200).json({
            success: true,
            message:"category delete successfully"
          })
        }
        else{
          return res.status(400).json({
            success:false,
            message:"category consists of some courses and hence cannot be deleted"
          })
        }

    }
    else{
      return res.status(400).json({
        status: false,
        error:"the id provided doesnt exists"
      })
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error: "internal server error" });
  }  
}