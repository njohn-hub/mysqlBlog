import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uId`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(501).json(err);

      return res.status(200).json("Post Created");
    });
  });
};

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM blog.posts WHERE cat = ?"
    : "SELECT * FROM blog.posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(501).json(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, `img`,`profilePic`, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uId WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(404).json(err);

    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uId` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("Only delete your posts");

      return res.status(200).json("posts deleted");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwtKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid Token");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title` =?, `desc` =?, `img` =?, `cat` =? WHERE `id` =? AND `uId` = ? ";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId,userInfo.id], (err, data) => {
      if (err) return res.status(501).json(err);

      return res.status(200).json("Post updated");
    });
  });
};
