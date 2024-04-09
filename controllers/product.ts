import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const createProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Product created Successfully",
      product: createProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
};
