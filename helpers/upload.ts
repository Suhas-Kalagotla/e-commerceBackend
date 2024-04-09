import multer, { Multer, FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "./public");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file format. Upload only JPEG/JPG or PNG"),
      false,
    );
  }
};

export const upload: Multer = multer({
  storage, 
  limits: { fileSize: 2000 * 2000 },
  fileFilter,
});
