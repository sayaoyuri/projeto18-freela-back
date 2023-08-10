import { db } from "../database/database.connection.js";

export const createProduct = async (ownerId, name, description, categoryId, price, photo) => {
  const result = await db.query(`INSERT INTO photos (url) VALUES ($1) RETURNING id; `, [photo]);
  const photoId = result.rows[0].id;
    
  return await db.query(`
    INSERT INTO products (owner_id, name, description, category_id, price, photo_id) 
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [ownerId, name, description, categoryId, price, photoId]);
};

export const listAllCategories = async () => {
  return await db.query(`SELECT id AS value, name AS label FROM categories`);
};