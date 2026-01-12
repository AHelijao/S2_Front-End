const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../boot/database/db_connect");
const { queryError, success, badRequest } = require("../constants/statusCodes");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    const hash = bcrypt.hashSync(password, 10);

    pool.query(
      `INSERT INTO users(email, username, password) VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hash],
      (err, rows) => {
        if (err) {
          console.log("Error creating user", err);
          return res.status(500).json({ error: err.message });
        } else {
          const user = rows.rows[0];
          console.log(user);
          return res.status(200).json(user);
        }
      }
    );
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "missing information" });
  }

  try {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, rows) => {
        if (err) {
          console.log("Error logging user", err);
          return res.status(500).json({ error: "error logging in" });
        }

        const user = rows.rows[0];

        if (!user) {
          return res.status(500).json({ message: "email or password incorrect" });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(500).json({ message: "email or password incorrect" });
        }

        req.session.user = {
          email: user.email,
        };

        const token = jwt.sign(
          { user: { email: user.email } },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(req.session.user);

        return res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log("Error logging user", error);
    return res.status(500).json({ error: "error logging in" });
  }
};

const logout = async (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
  return res.status(204).send();
};

const getUser = async (req, res) => {
  try {
    if (!req.session || !req.session.user || !req.session.user.email) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [req.session.user.email],
      (err, rows) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ error: "error getting user" });
        }
        const user = rows.rows[0];
        return res.status(200).json(user);
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error getting user" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  logout
};
