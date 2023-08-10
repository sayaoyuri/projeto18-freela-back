import { createProduct, listAllCategories } from "../repositories/product.repository.js";

export const registerProduct = async (req, res) => {
  try {
    const ownerId = res.locals.token.id;
    const { name, description, categoryId, price, photo } = req.body;

    console.log(name, description, categoryId, price, photo);

    await createProduct(ownerId, name, description, categoryId, price, photo);
    return res.status(201).send();
  } catch (error) {
    if(error.constraint === 'photos_url_key') return res.status(422).send("Imagem já cadastrada!");

    return res.status(500).send(error.message);
  };
};

export const getCategories = async (req, res) => {
  try {
    const result = await listAllCategories();

    return res.send(result.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};