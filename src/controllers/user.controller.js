import bcrypt from "bcrypt";
import { createUser } from "../repositories/user.repository.js";

export const signUp = async (req, res) => {
  try {
    const { name, cpf, email, password, phone } = req.body;

    const hasedPassword = bcrypt.hashSync(password, 10);

    await createUser(name, cpf, email, hasedPassword, phone);

    return res.status(201).send("Cadastro Realizado com sucesso");
  } catch (error) {
    if(error.constraint === 'users_email_key') return res.status(409).send("O E-mail informado já está em uso!");
    if(error.constraint === 'users_cpf_key') return res.status(409).send("O CPF informado já está em uso!");

    return res.status(500).send(error.message);
  };
};