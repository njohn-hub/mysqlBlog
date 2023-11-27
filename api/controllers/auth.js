import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //
  // check for existing user

  const q = "SELECT * FROM blog.users WHERE email = ? Or username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User Already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO blog.users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("user created");
    });
  });
};

export const login = (req, res) => {
  //  if user exists

  const q = "SELECT * FROM blog.users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) return res.status(404).json("User not found");

    const correctPass = bcrypt.compareSync(req.body.password, data[0].password);

    if (!correctPass) return res.status(400).json("wrong credentials");

    const token = jwt.sign({ id: data[0].id }, "jwtKey");

    const { password, ...others } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Logged out successfully");
};
