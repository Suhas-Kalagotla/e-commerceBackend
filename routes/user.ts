import express from "express";
import {  getUser, getUsers } from "../controllers/user";

const userRouter = express.Router(); 

userRouter.get("/get/:id",getUser); 
userRouter.get("/get", getUsers);

export default userRouter; 
