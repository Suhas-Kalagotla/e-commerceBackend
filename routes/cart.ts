import express from "express";
import { get, add, remove } from "../controllers/cart";
const cartRouter = express.Router();

cartRouter.get("/get", get);
cartRouter.post("/add", add);
cartRouter.post("/delete", remove);

export default cartRouter;
