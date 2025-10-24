import { Request, Response } from "express";
import { includes } from "zod";
import prisma from "../config/prisma.config";


exports.getCategories =async (req, res) => {

    try {
        const allCategories= await prisma.Category.findMany(
          {
            include:{
                id:true,
                name:true,
                courses: true,

            }
          }
        );
        res.jason(allCategories)
        console.log("Categories", allCategories)
    } catch (error) {
        console.log("get all the categories error", error)
        res.status(500).json({error: "failed to fetch categories and their courses"})
    }
    
    
}










