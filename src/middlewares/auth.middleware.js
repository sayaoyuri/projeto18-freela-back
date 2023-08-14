import Jwt from "jsonwebtoken";
import { AUTH_KEY } from "../config.js";
import { getSession } from "../repositories/session.repository.js";

export const createToken = (data) => {
  return Jwt.sign(data, AUTH_KEY);
};

export const validateAuth = async (req, res, next) => {
  try {
    if(!req.headers.authorization) return res.sendStatus(401).send("Token de autorização necessário!");

    const token = req.headers.authorization?.replace('Bearer ', '');

    res.locals.token = Jwt.verify(token, AUTH_KEY);
    
    const isTokenExist = await getSession(token);
    if(isTokenExist.rowCount === 0) return res.sendStatus(401).send("Sessão inválida! Faça login Novamente!");
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Login necessário para realizar operação!");
  };
};