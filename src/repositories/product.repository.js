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

export const listProductById = async (id) => {
  return await db.query(`
    SELECT p.name, p.description, u.name AS "ownerName", u.email, u.phone, c.name AS category, p.price, p1.url AS "imageUrl" 
      FROM products p
        JOIN users u 
          ON u.id = p.owner_id
        JOIN categories c
          ON c.id = p.category_id
        JOIN photos p1 
          ON p1.id = p.photo_id
      WHERE p.id = $1 AND p.available = TRUE;
  `, [id]);
};

export const listAllProducts = async () => {
  return await db.query(`
    SELECT p.id, p.name, p.price, c.name AS category, p1.url AS "imageUrl" 
      FROM products p
        JOIN categories c
          ON c.id = p.category_id
        JOIN photos p1 
          ON p1.id = p.photo_id
      WHERE p.available = TRUE
      LIMIT 8;
  `);
};