import express from "express";
import { uploadFile } from "../controllers/uploadFile";
import { create } from "../controllers/product";

const fileRouter = express.Router();

fileRouter.post("/upload", uploadFile,create);

export default fileRouter;
