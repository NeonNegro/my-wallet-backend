import { signUp, signIn, signOut } from "../controllers/authController.js";
import { Router } from "express";
import newUserSchameValidationMiddleware from "../middlewares/newUserSchemaValidationMidleware.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";

const authRouter = Router();
authRouter.post("/auth/sign-up", newUserSchameValidationMiddleware, signUp);
authRouter.post("/auth/sign-in", signIn);
authRouter.delete("/auth/sign-out", tokenValidationMiddleware, signOut);

export default authRouter;