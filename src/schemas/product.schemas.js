import Joi from "joi";

export const newProductSchema = Joi.object({
  name: Joi.string().min(6).max(30).trim().required(),
  description: Joi.string().min(6).max(100).trim().required(),
  categoryId: Joi.number().integer().required(),
  price: Joi.number().required(),
  photo: Joi.string().uri().required()
});

export const productStatus = Joi.object({
  available: Joi.boolean().required()
});