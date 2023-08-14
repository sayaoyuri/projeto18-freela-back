import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import { signIn, signUp, userData } from "../controllers/user.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
userRouter.post('/sign-in', validateSchema(signInSchema), signIn);
userRouter.get('/users/:id', validateAuth, userData);

export default userRouter;