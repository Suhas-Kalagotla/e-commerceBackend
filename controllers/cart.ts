import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import { Cart, CartItem, Product } from "@prisma/client";

export const get = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.query;
    const cart = await prisma.cart.findUnique({
      where: { id: cartId as string },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, cart: cart });
  } catch (error: any) {
    throw createError(400, (error as Error).message);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const { product, user } = req.body;

    const cart = await prisma.cart.findUnique({
      where: {
        id: user.cartId,
      },
      include: {
        items: true,
      },
    });

    if (!cart) throw createError(404, "Cart not found");

    let cartItem = cart.items.find((item) => item.productId === product.id);

    cartItem = await prisma.cartItem.create({
      data: {
        productId: product.id,
        cartId: user.cartId,
        quantity: 1,
      },
    });

    const updateCart = await prisma.cart.update({
      where: {
        id: user.cartId,
      },
      data: {
        items: {
          connect: { id: cartItem.id },
        },
      },
      include: {
        items: true,
      },
    });

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: updateCart,
    });
  } catch (error: any) {
    throw createError(400, (error as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.body;

    const deletedItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    // const updatedCart = await prisma.cart.update({
    //   where: {
    //     id: deletedItem.cartId,
    //   },
    //   data: {
    //     items: {
    //       disconnect: [{ id: deletedItem.id }],
    //     },
    //   },
    //   include: {
    //     items: true,
    //   },
    // });

    res.status(200).json({
      message: "CartItem removed from cart successfully",
      //   cart: updatedCart,
    });
  } catch (error: any) {
    throw createError(400, (error as Error).message);
  }
};
