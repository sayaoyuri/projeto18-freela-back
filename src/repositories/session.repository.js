import { db } from "../database/database.connection.js";

export const createSession = async (userId, token) => {
  return await db.query(`INSERT INTO sessions (user_id, token) VALUES($1, $2)`, [userId, token]);
};

export const getSession = async (token) => {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
};

export const getToken = async (token) => {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
};