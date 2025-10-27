
import { Request, Response } from "express";
import { includes } from "zod";
import prisma from "../config/prisma.config";

// exports.getCategories =async (req, res) => {

//     try {
//         const allCategories= await prisma.Category.findMany(
//           {
//             include:{
//                 id:true,
//                 name:true,
//                 courses: true,

//             }
//           }
//         );
//         res.jason(allCategories)
//         console.log("Categories", allCategories)
//     } catch (error) {
//         console.log("get all the categories error", error)
//         res.status(500).json({error: "failed to fetch categories and their courses"})
//     }
    
    
// }

export const getCategories =async (req,res) => {
    try {
        const allCategories= await prisma.$queryRaw<Array<any>>`
        SELECT
        c.id AS "categoryId",        
        c.name AS "categoryName",    
        co.id AS "courseId",         
        co.name AS "courseName",
        co.imageurl AS "imageURL",   
        co.shortdes AS "shortDesc"
    FROM 
    category c
    LEFT JOIN
        course co ON c.id = co."categoryId"
    ORDER BY
        "categoryId", "courseId";
`;

        res.json(allCategories)

    } catch (error) {
        console.log("get all categories error",error)
        res.status(500).json({error:"failed to fetch categories and their courses"})
    }
}

