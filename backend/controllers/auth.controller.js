const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../utils/dbConnection");

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const pwdHash = bcryptjs.hashSync(userPassword, 10);

    const checkExistingEmailQuery = `SELECT user_email FROM users WHERE user_email=?`;

    connection.query(
      checkExistingEmailQuery,
      [userEmail],
      async (err, existingUser) => {
        if (err) {
            console.log(err);   // add this line

          return res
            .status(500)
            .json({ error: "Error while checking existing email." });
        }

        if (existingUser.length > 0) {
          return res.status(400).json({ message: "Email already exists." });
        }

        const insertUserQuery = `INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)`;

        connection.query(
          insertUserQuery,
          [userName, userEmail, pwdHash],
          (err, insertUserResult) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Enter valid credentials." });
            }

            console.log("Insert ID: " + insertUserResult.insertId);
            res.status(201).json({ message: "User created successfully." });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Please enter valid credentials." });
  }
};

const signin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const checkExistingEmailQuery = `SELECT user_id, user_email, user_password FROM users WHERE user_email=?`;

    connection.query(
      checkExistingEmailQuery,
      [userEmail],
      async (err, existingUser) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "You don't have an existing account" });
        }
        if (existingUser.length === 0) {
          return res.status(404).json({ message: "Invalid Credentials" });
        }

        const validPassword = bcryptjs.compareSync(
          userPassword,
          existingUser[0].user_password
        );

        if (!validPassword) {
          return res.status(401).json({ message: "Invalid Credentials" });
        }

        const aT = jwt.sign(
          { id: existingUser[0].id },
          process.env.ACCESS_TOKEN
        );

        res.json({
          message: "Logged in successfully",
          token: aT,
          userId: existingUser[0].user_id,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Please enter valid credentials." });
  }
};

module.exports = { signin, signup };
