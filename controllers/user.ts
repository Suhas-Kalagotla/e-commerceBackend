import { Request, Response } from "express"; 
import prisma from "../prisma/prismaClient"; 


export const getUser = async(req: Request, res: Response) =>{
    const {id} = req.params; 
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id, 
            }, 
        }); 

        res.status(200).json({success: true, user}); 
    }catch(error) {
        res.status(400).json({success: false, error: error}); 
    }
}; 

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

