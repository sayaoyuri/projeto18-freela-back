import { createProduct, listAllCategories, listAllProducts, listProductById, setProductAvailable } from "../repositories/product.repository.js";

export const registerProduct = async (req, res) => {
  try {
    const ownerId = res.locals.token.id;
    const { name, description, categoryId, price, photo } = req.body;

    console.log(name, description, categoryId, price, photo);

    await createProduct(ownerId, name, description, categoryId, price, photo);
    return res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    if(error.constraint === 'photos_url_key') return res.status(409).send("Imagem já cadastrada!");

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

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await listProductById(id);
    console.log(result);

    if(result.rowCont === 0) return res.status(404).send("Produto inexistente!");

    return res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await listAllProducts();

    return res.send(result.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = res.locals.token.id;
    const { available } = req.body;

    const isProductExist = await listProductById(id);
    if(isProductExist.rowCount === 0) return res.status(404).send("Produto inexistente!");
    if(isProductExist.rows[0].ownerId !== ownerId) return res.status(401).send("Você só pode atualizar o status de seus desapegos!");

    const result = await setProductAvailable(id, ownerId, available);
    if(result.rowCont === 0) return res.status(404).send("Produto inexistente");

    return res.status(200).send(!available ? "Desapego com sucesso!" : "Desapego disponível novamente!");
  } catch (error) {
    return res.status(500).send(error.message);
    
  }
};