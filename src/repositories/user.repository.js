import { db } from "../database/database.connection.js";

export const createUser = async (name, cpf, email, password, phone) => {
  return await db.query(`
    INSERT INTO users (name, cpf, email, password, phone) VALUES ($1, $2, $3, $4, $5);
  `, [name, cpf, email, password, phone]);
};

export const getUser = async (email) => {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

export const getUserData = async (id) => {
  return await db.query(`
    SELECT u.id, u.name, u.email, u.phone,
      (SELECT json_agg(row_to_json(user_products)) FROM (
        SELECT p.id, p.name, available, p.price, photos.url AS "imageUrl"
          FROM products p
          JOIN photos on p.photo_id = photos.id
          WHERE owner_id = u.id ORDER BY id
        ) AS user_products
      ) AS products
      FROM users u
      JOIN products p
        ON u.id = p.owner_id
      WHERE u.id = $1
      GROUP BY u.id;
  `, [id]);
};