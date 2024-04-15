import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import cors from "cors";
import { authRouter, userRouter, productRouter,cartRouter } from "../routes";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public/uploads")));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart",cartRouter); 

app.use(async (req: Request, res: Response, next: express.NextFunction) => {
  const error = createError(404, "not found");
  next(error);
});

app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: express.NextFunction,
  ) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  },
);

prisma
  .$connect()
  .then(() => {
    console.log("[server]: Connected to database");
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("[server]: Failed to connect to the database", error);
  });
