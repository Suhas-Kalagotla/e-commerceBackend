import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import express from "express";

export const create = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  try {
    const { name, description, price, image } = req.body;
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

    const imagePath = path.join(__dirname, filePath);

    try {
      const createProduct = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          imageUrl: imagePath,
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
