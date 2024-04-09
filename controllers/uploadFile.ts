import express, { Request, Response, NextFunction } from "express";
import { upload } from "../helpers/upload";
import multer from "multer";

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file); 
  upload.single("file")(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "File upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = req.file.filename;
    console.log("file upload sccessfull");
    const { imageUrl, ...rest } = req.body;
    const product = {
      imageUrl: filename,
      rest,
    };
    next(product);
  });
};
