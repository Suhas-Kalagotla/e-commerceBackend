import express from "express";
import {  uploadFile } from "../controllers/fileUpload";

const fileRouter = express.Router(); 

fileRouter.post("/upload",uploadFile); 

export default fileRouter ; 
