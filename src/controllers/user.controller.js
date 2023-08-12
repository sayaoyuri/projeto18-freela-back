import bcrypt from "bcrypt";
import { createUser, getUser } from "../repositories/user.repository.js";
import { createToken } from "../middlewares/auth.middleware.js";
import { createSession } from "../repositories/session.repository.js";

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

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await getUser(email);

    if(result.rowCount === 0) return res.status(401).send("E-mail inválido!");

    const user = result.rows[0];

    const matchPassword = bcrypt.compareSync(password, user.password);
    if(!matchPassword) return res.status(401).send("Senha inválida!");

    const userData = { id: user.id, name: user.name, email };

    const token = createToken(userData);
    await createSession(userData.id, token);

    return res.send({ id: userData.id, name: userData.name, token });
  } catch (error) {
    if(error.message === "invalid signature") return res.status(401).send("Login necessário para realizar operação!")

    return res.status(500).send(error.message);
  };
};