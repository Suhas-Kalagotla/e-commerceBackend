import express from "express";
import { create } from "../controllers/product";
import { upload } from "../helpers/upload";

const productRouter = express.Router();

productRouter.post("/create", upload.single("image"), create);

export default productRouter;
