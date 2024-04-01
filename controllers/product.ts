import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const create = async(req:Request , res:Response) =>{
    try{
        console.log("router"); 
        const { name , description, price, image } = req.body; 
        console.log(name); 
    }
    catch (error) {
        res.status(400).json({ success: false, error: error });
        console.log(error);
    }
}
