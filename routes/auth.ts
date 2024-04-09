import express from "express";
import { register, signin } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", signin);

export default authRouter;
