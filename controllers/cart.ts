import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import { Cart, CartItem, Product } from "@prisma/client";

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const cart = await prisma.cart.findUnique({
      where: { cartId: id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  } catch (error) {}
};
