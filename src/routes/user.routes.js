import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/user.schemas.js";
import { signUp } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.post('/sign-up', validateSchema(signUpSchema), signUp);

export default userRouter;