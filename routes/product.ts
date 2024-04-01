import express from 'express'
import { create } from "../controllers/product"; 

const productRouter = express.Router(); 

productRouter.post("/create",create);

export default productRouter; 
