import { db } from "../database/database.connection.js";

export const createUser = async (name, cpf, email, password, phone) => {
  return await db.query(`
    INSERT INTO users (name, cpf, email, password, phone) VALUES ($1, $2, $3, $4, $5);
  `, [name, cpf, email, password, phone]);
};

export const getUser = async (email) => {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};