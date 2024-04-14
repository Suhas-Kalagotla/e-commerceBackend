import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    const isExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (isExists) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        cartId: cart.id,
      },
    });

    res.status(201).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
