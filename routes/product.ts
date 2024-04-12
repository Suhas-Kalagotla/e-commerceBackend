import express from "express";
import { create, getAll } from "../controllers/product";
import { upload } from "../helpers/upload";

const productRouter = express.Router();

productRouter.post("/create", upload.single("image"), create);
productRouter.get("/get", getAll);

export default productRouter;
