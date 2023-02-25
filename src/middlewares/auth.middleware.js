import db from "../configs/database.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import bcrypt from "bcrypt";

export async function signUpValidation(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(422)
      .send(
        "All fields (name, email, password and confirmPassword) are required"
      );
  }

  const { error } = signUpSchema.validate(
    { name, email, password, confirmPassword },
    { abortEarly: false }
  );

  if (error) {
    const erroMessages = error.details.map((detail) => detail.message);
    return res.status(422).send(erroMessages);
  }

  const checkUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [
    email,
  ]);

  if (checkUser.rowCount !== 0)
    return res.status(409).send("User already exists");

  res.locals.new_user = { name, email, password };

  next();
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send("All fields (email and password) are required");

  const { error } = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    const errorsMessages = error.details.map((detail) => detail.message);
    return res.status(422).send(errorsMessages);
  }

  try {
    const userRegistered = await db.query(
      `
    SELECT * FROM users
    WHERE email=$1;`,
      [email]
    );

    console.log(userRegistered.rows[0].id)

    if (userRegistered.rowCount == 0)
      return res.status(401).send("User not found");

    const checkPassword = bcrypt.compareSync(
      password,
      userRegistered.rows[0].password
    );

    if (!checkPassword) return res.status(401).send("Incorrect Password");

    if (userRegistered && checkPassword) {
      const tokenExists = await db.query(
        `
        SELECT * FROM sessions
        WHERE user_id=$1`,
        [userRegistered.rows[0].id]
      );
        
      if (tokenExists) {
        res.locals.tokenExists = tokenExists.rows[0];
      }
    } else {
      return res
        .status(422)
        .send("User not registered or Invalid UserName or Invalid Password");
    }
    
    res.locals.userRegistered = userRegistered.rows[0].id;
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um problema no servidor");
  }
  next();
}
