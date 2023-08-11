import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { newProductSchema } from "../schemas/product.schemas.js";
import { getCategories, getProduct, getProducts, registerProduct } from "../controllers/product.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const productRouter = Router();
productRouter.post('/products/new', validateAuth, validateSchema(newProductSchema), registerProduct);
productRouter.get('/products/categories', getCategories);
productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProduct);

export default productRouter;