import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient";
import createError from "http-errors";
import cors from "cors";
import { fileRouter, authRouter, userRouter, productRouter } from "../routes";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

const upload = multer({ dest: "./public" });

app.post("/upload_files", upload.single("image"), uploadFiles);
function uploadFiles(req: Request, res: Response) {
  try {
    const image = req.body.image;
    if (!image) {
      return res.status(400).json({ error: "no file uploaded" });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png";
    const filePath = path.join(__dirname, "../public/uploads", fileName);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ error: "Failed to save file" });
      }

      console.log("File saved as:", filePath);
      res
        .status(200)
        .json({ message: "File uploaded successfully", fileName: fileName });
    });
    const imagePath = path.join(__dirname, filePath);
  } catch (error) {
    console.log(error);
  }
}

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
