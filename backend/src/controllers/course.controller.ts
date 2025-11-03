
import { Request, Response } from "express";
import { isStringLiteral } from "typescript";
import { includes } from "zod";
import { id } from "zod/v4/locales";
import prisma from "../config/prisma.config";


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

export const createCategories = async (req,res)=>{
    const {name ,courseIds=[] } =req.body;
    if (!name || typeof name !== 'string' ){
        return res.status(400).json({
            error: "category name should be non-empty and should be a string"
        })
    }
    try {
        let connectData={}
        if(courseIds.length >0){
            const courseData= courseIds.map(id=>({id:id}))
            connectData={
                connect:courseData
            }
        }

        const newCategory = await prisma.category.create({
            data:{
                name: name,
                courses:connectData
            },
            include:{
                courses:true
            }
        });
        res.status(201).json(newCategory)
        console.log(newCategory)

    } catch (error) {
        console.log("error",error)
        res.status(500).json({ error: "Failed to create category or link courses." });
    }
}

