import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import express from "express";

export const getUser = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(createError(400, (error as Error).message));
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    return next(createError(400, (error as Error).message));
  }
};
