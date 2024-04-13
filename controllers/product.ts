import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import express from "express";
import { Category } from "@prisma/client";

export const create = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  try {
    const { name, description, price, image, category } = req.body;
    if (!image) {
      throw createError(400, "No file Uploaded");
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png";
    const filePath = path.join(__dirname, "../public/uploads", fileName);

    fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
        return next(createError(500, "Failed to upload image"));
      }
    });

    try {
      const createProduct = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          imageUrl: fileName,
          category: category,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Product created Successfully",
        product: createProduct,
      });
    } catch (error: any) {
      return next(createError(400, (error as Error).message));
    }
  } catch (error: any) {
    return next(createError(400, (error as Error).message));
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const products = await prisma.product.findMany({
      where: category === "all" ? {} : { category: category as Category },
    });
    res.status(200).json({ success: true, products: products });
  } catch (error: any) {
    throw createError(400, (error as Error).message);
  }
};
