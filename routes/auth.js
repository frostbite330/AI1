import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";  // Note .js extension required in ESM

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    stmt.run(username, hashedPassword);

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const user = stmt.get(username);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Wrong password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
